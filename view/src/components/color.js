import "./color.css";

import React from "react";

const Color = ({ color }) => {
  return (
    <label className="color">
      <input type="radio" name="color" value={color} />
      <span className="checkmark" id={color}></span>
    </label>
  );
};

export default Color;
