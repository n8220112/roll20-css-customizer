import React from "react";
import {Col, Form, InputGroup} from "react-bootstrap";
import {MdBlurOn} from "react-icons/md";
import {GrPowerReset} from "react-icons/gr";

import ColorInput from "./inputs/ColorInput";

const TextShadowControl = ({textShadow, setStyleState}) => {
  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setStyleState((prev) => ({
      ...prev,
      textShadow: {
        ...prev.textShadow,
        [key]: value,
      },
    }));
  };
  // 값이 바뀔 때마다 styleState 업데이트
  const handleColorChange = (newColor) => {
    setStyleState((prev) => ({
      ...prev,
      textShadow: {
        ...prev.textShadow,
        color: newColor,
      },
    }));
  };
  // 리셋 버튼 핸들러
  const handleReset = () => {
    setStyleState((prev) => ({
      ...prev,
      textShadow: {
        x: "",
        y: "",
        blur: "",
        color: "",
      },
    }));
  };

  return (
    <Col xs={12} md={12}>
      <div className="info">텍스트 그림자</div>
      <div className="control">
        <InputGroup className="control-group">
          <InputGroup.Text>x</InputGroup.Text>
          <Form.Control type="number" placeholder="px" value={textShadow.x} onChange={handleChange("x")} />
        </InputGroup>

        <InputGroup className="control-group">
          <InputGroup.Text>y</InputGroup.Text>
          <Form.Control type="number" placeholder="px" value={textShadow.y} onChange={handleChange("y")} />
        </InputGroup>

        <InputGroup className="control-group">
          <InputGroup.Text>
            <MdBlurOn />
          </InputGroup.Text>
          <Form.Control type="number" placeholder="px" value={textShadow.blur} onChange={handleChange("blur")} />
        </InputGroup>

        <ColorInput value={textShadow.color} onChange={handleColorChange} />

        <button className="toggle-detail reset-button" onClick={handleReset}>
          <GrPowerReset />
        </button>
      </div>
    </Col>
  );
};

export default TextShadowControl;
