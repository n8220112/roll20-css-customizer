import React from "react";
import ColorInput from "./inputs/ColorInput";
import {Button} from "react-bootstrap";

const ColorControl = ({color, setStyleState}) => {
  const handleColorChange = (newColor) => {
    setStyleState((prev) => ({...prev, color: newColor}));
  };

  const handleDefault = () => {
    setStyleState((prev) => ({...prev, color: "#404040"}));
  };

  return (
    <>
      <Button className="additional-button" variant="outline-info" size="sm" onClick={handleDefault}>
        default
      </Button>
      {/* input에 작성했던 값을 기본 회색으로 대체  */}
      <ColorInput value={color} onChange={handleColorChange} />
    </>
  );
};

export default ColorControl;
