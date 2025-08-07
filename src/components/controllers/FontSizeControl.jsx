import React from "react";
import {Form} from "react-bootstrap";

const FontSizeControl = ({fontSize, setStyleState}) => {
  const handleChange = (e) => {
    const value = e.target.value;
    setStyleState((prev) => ({
      ...prev,
      fontSize: value ? `${value}px` : "",
    }));
  };

  const cleanValue = fontSize?.endsWith("px") ? fontSize.replace("px", "") : fontSize || "";
  return <Form.Control placeholder="px" type="number" min="0" aria-label="fontSizeControlInput" value={cleanValue} onChange={handleChange} />;
};

export default FontSizeControl;
