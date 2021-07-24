import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

import Nav from "./components/nav";
import ColorForm from "./components/colorForm";

const url = "https://colorfilter.herokuapp.com/filter";
// const url = "http://localhost:8000/filter";

const App = () => {
  const [color, setColor] = useState("gray");
  const [filtered, setFiltered] = useState(false);
  const [image, setImage] = useState(null);

  const webcamRef = useRef();
  const pyImage = useRef();

  useEffect(() => {
    if (color !== "gray" && !filtered) {
      const imageSrc = webcamRef.current.getScreenshot();
      axios
        .post(url, { image: imageSrc, color })
        .then((data) => {
          setColor("gray");
          setImage(data.data.image);
          setFiltered(true);
        })
        .catch((err) => console.log(err));
    }
  }, [color, filtered]);

  const camWidth = window.innerWidth > 600 ? null : window.innerWidth;

  const mainStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: window.innerHeight - 80,
  };

  return (
    <>
      <Nav />
      <main style={mainStyle}>
        <ColorForm filtered={filtered} setColor={setColor} />
        {filtered ? (
          <>
            <img ref={pyImage} src={image} alt="colored filtered input" />
            <button
              style={{
                border: "none",
                cursor: "pointer",
                position: "absolute",
                zIndex: 10,
                bottom: 50,
                padding: "0.125rem 1rem",
                background: "#c1c1c1",
                borderRadius: "0.25rem",
              }}
              onClick={() => {
                setFiltered(false);
                setImage(null);
                setColor("gray");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#a1a1a1"
              >
                <path d="M13.5 2c-5.288 0-9.649 3.914-10.377 9h-3.123l4 5.917 4-5.917h-2.847c.711-3.972 4.174-7 8.347-7 4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5c-3.015 0-5.662-1.583-7.171-3.957l-1.2 1.775c1.916 2.536 4.948 4.182 8.371 4.182 5.797 0 10.5-4.702 10.5-10.5s-4.703-10.5-10.5-10.5z" />
              </svg>
            </button>
          </>
        ) : (
          <Webcam
            style={{
              width: camWidth,
              border: `5px solid ${color}`,
              position: "relative",
              bottom: window.innerWidth > 600 ? null : 50,
            }}
            audio={false}
            ref={webcamRef}
            mirrored={true}
            screenshotFormat="image/png"
            videoConstraints={{ facingMode: "user" }}
          />
        )}
      </main>
    </>
  );
};

export default App;
