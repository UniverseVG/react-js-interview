import { useEffect, useState } from "react";
import "./App.css";
import { useThrottle } from "./hooks/useThrottle";

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleWindowResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then(console.log);
  };

  const throttleHandleResize = useThrottle(handleWindowResize, 1000);

  useEffect(() => {
    window.addEventListener("resize", throttleHandleResize);
    return () => {
      window.removeEventListener("resize", throttleHandleResize);
    };
  });
  return (
    <div>
      <h1>Window Size</h1>
      <p>
        {windowSize.width} x {windowSize.height}
      </p>
    </div>
  );
}

export default App;
