import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as dgram from 'dgram';
import { Client } from 'ssh2';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('wake')
  wakeDevice(@Body('mac') mac: string) {
    const macBytes = mac.split(':').map((b) => parseInt(b, 16));
    if (macBytes.length !== 6) throw new Error('Invalid MAC address');

    const packet = Buffer.alloc(6 + 16 * 6, 0xff);
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 6; j++) {
        packet[6 + i * 6 + j] = macBytes[j];
      }
    }

    const client = dgram.createSocket('udp4');
    client.bind(() => {
      client.setBroadcast(true);
      client.send(packet, 0, packet.length, 9, '255.255.255.255', (err) => {
        client.close();
        if (err) throw err;
      });
    });

    return { message: 'Magic packet sent' };
  }

  @Post('shutdown')
  async shutdownDevice(
    @Body() body: { ip: string; username: string; password: string },
  ) {
    return new Promise((resolve, reject) => {
      const conn = new Client();
      conn
        .on('ready', () => {
          conn.exec('sudo shutdown -h now', { pty: true }, (err, stream) => {
            if (err) return reject(err);
            stream.on('close', () => {
              conn.end();
              resolve({ message: 'Shutdown command sent' });
            });
          });
        })
        .on('error', (err) => reject(err))
        .connect({
          host: body.ip,
          port: 22,
          username: body.username,
          password: body.password,
        });
    });
  }
}
