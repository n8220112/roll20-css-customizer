import React from "react";
import {Form} from "react-bootstrap";

const LetterSpacingControl = ({letterSpacing, setStyleState}) => {
  const handleChange = (e) => {
    const value = e.target.value;
    setStyleState((prev) => ({
      ...prev,
      letterSpacing: value ? `${value}px` : "",
    }));
  };

  const cleanValue = letterSpacing?.endsWith("px") ? letterSpacing.replace("px", "") : letterSpacing || "";

  return <Form.Control placeholder="px" type="number" aria-label="letterSpacingControlInput" value={cleanValue} onChange={handleChange} />;
};

export default LetterSpacingControl;
