import "./loading.css";
import React from "react";

const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="Loading"
        style={{
          zIndex: 10,
          position: "absolute",
          bottom: window.innerHeight / 2 - 100,
          background: null,
          border: "12px solid #1a1a1a",
          borderRadius: "50%",
          borderTop: "12px solid #2a2a2a",
          width: "70px",
          height: "70px",
        }}
      ></div>
    </div>
  );
};

export default Loading;
