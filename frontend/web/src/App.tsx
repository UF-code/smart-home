import { useState } from "react";
import { setTheme } from "./utils/theme";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen w-screen background text">
      <button
        className="p-2 cursor-pointer bg-primary"
        onClick={() => {
          setTheme("light");
        }}
      >
        light
      </button>

      <button
        className="p-2 cursor-pointer bg-secondary text-primary"
        onClick={() => {
          setTheme("dark");
        }}
      >
        dark
      </button>
    </div>
  );
}

export default App;
