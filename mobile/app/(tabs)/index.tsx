import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import axios from "axios";

export default function HomeScreen() {
  const url = process.env.EXPO_PUBLIC_API_URL;

  const username = process.env.EXPO_PUBLIC_USERNAME;
  const password = process.env.EXPO_PUBLIC_PASSWORD;

  const prime = process.env.EXPO_PUBLIC_PRIME_MAC;
  const primeIp = process.env.EXPO_PUBLIC_PRIME_IP;

  const dummy = process.env.EXPO_PUBLIC_DUMMY_MAC;
  const dummyIp = process.env.EXPO_PUBLIC_DUMMY_IP;

  const wakeUpDevice = async (macAddress: any) => {
    try {
      const response = await axios.post(`${url}/wake`, {
        mac: macAddress,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const shutDownDevice = async (ip: any, username: any, password: any) => {
    try {
      const response = await axios.post(`${url}/shutdown`, {
        ip,
        username,
        password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <TouchableOpacity
          style={{
            padding: 5,
            backgroundColor: "aqua",
            borderRadius: 12,
            marginVertical: 10,
            alignItems: "center",
          }}
        >
          <ThemedText
            onPress={() => {
              wakeUpDevice(prime);
            }}
          >
            Wake Up Prime!
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 5,
            backgroundColor: "red",
            borderRadius: 12,
            marginVertical: 10,
            alignItems: "center",
          }}
        >
          <ThemedText
            style={{ color: "white" }}
            onPress={() => {
              shutDownDevice(primeIp, username, password);
              console.log("asdfasdf");
            }}
          >
            Goodnight Prime!
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 5,
            backgroundColor: "aqua",
            borderRadius: 12,
            marginVertical: 10,
            alignItems: "center",
          }}
        >
          <ThemedText
            onPress={() => {
              wakeUpDevice(dummy);
            }}
          >
            Wake Up Dummy!
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 5,
            backgroundColor: "red",
            borderRadius: 12,
            marginVertical: 10,
            alignItems: "center",
          }}
        >
          <ThemedText
            style={{ color: "white" }}
            onPress={() => {
              shutDownDevice(dummyIp, username, password);
            }}
          >
            Goodnight Dummy!
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">
            npm run reset-project
          </ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
