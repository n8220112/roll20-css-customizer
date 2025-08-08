import React from "react";

const ToggleSwitch = () => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" /* checked={checked} onChange={onChange} */ />
      <span className="slider" />
    </label>
  );
};

export default ToggleSwitch;
