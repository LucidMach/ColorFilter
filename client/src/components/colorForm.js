import React from "react";
import Color from "./color";

const ColorForm = ({ filtered, setColor }) => {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        setColor(e.target.color.value);
      }}
    >
      <h3>Choose Filter</h3>
      <div style={{ display: "flex" }}>
        <Color color="red" />
        <Color color="green" />
        <Color color="blue" />
        <Color color="yellow" />
        <Color color="pink" />
        <Color color="cyan" />
      </div>
      <button
        type="submit"
        style={{
          cursor: filtered ? "not-allowed" : "pointer",
          border: "none",
          position: "absolute",
          zIndex: 10,
          bottom: 50,
          padding: "0.125rem 1rem",
          background: "#c1c1c1",
          borderRadius: "0.25rem",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#a1a1a1"
        >
          <path d="M5 4h-3v-1h3v1zm8 6c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-5v17h-24v-17h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm13 4c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z" />
        </svg>
      </button>
    </form>
  );
};

export default ColorForm;
