import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

import Nav from "./components/nav";

const url = "http://127.0.0.1:8000/filter";

const App = () => {
  const [color, setColor] = useState("gray");

  const colorClick = (color) => {
    setColor(color);
  };

  const mainStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: window.innerHeight - 80,
  };

  const webcamRef = useRef();

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    axios
      .post(url, { image: imageSrc, color })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, [webcamRef, color]);

  return (
    <>
      <Nav />
      <main style={mainStyle}>
        Choose Color Filter
        <div style={{ display: "flex", margin: "0 0 0.5rem 0" }}>
          <div
            className="color red"
            style={{ background: "#f10101" }}
            onClick={() => colorClick("red")}
          ></div>
          <div
            className="color"
            value="green"
            style={{ background: "#01f101" }}
            onClick={() => colorClick("green")}
          ></div>
          <div
            className="color"
            value="blue"
            style={{ background: "#0101f1" }}
            onClick={() => colorClick("blue")}
          ></div>
          <div
            className="color"
            value="yellow"
            style={{ background: "#f1f101" }}
            onClick={() => colorClick("yellow")}
          ></div>
          <div
            className="color"
            value="meganta"
            style={{ background: "#f101f1" }}
            onClick={() => colorClick("pink")}
          ></div>
          <div
            className="color"
            value="cyan"
            style={{ background: "#01f1f1" }}
            onClick={() => colorClick("cyan")}
          ></div>
        </div>
        <Webcam
          style={{ border: `5px solid ${color}` }}
          audio={false}
          ref={webcamRef}
          mirrored={true}
          screenshotFormat="image/png"
          videoConstraints={{ facingMode: "user" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <button
            style={{
              border: "none",
              padding: "0.5rem 2rem",
              background: "#1a1a1a",
              color: "#f1f1f1",
              margin: "0 1rem",
            }}
            onClick={capture}
          >
            SNAP
          </button>
          {/* <input
            type="file"
            style={{
              background: "#1a1a1a",
              color: "#f1f1f1",
              margin: "0 1rem",
            }}
            onChange={(e) => console.log(e.target.value)}
          /> */}
        </div>
      </main>
    </>
  );
};

export default App;
