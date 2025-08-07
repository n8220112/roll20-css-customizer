import React from "react";
import {Col, Form, InputGroup} from "react-bootstrap";
import {MdBlurOn} from "react-icons/md";
import {GrPowerReset} from "react-icons/gr";
import ColorInput from "./inputs/ColorInput";

const BoxShadowControl = ({boxShadow, setStyleState}) => {
  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setStyleState((prev) => ({
      ...prev,
      boxShadow: {
        ...prev.boxShadow,
        [key]: value,
      },
    }));
  };
  // 값이 바뀔 때마다 styleState 업데이트
  const handleColorChange = (newColor) => {
    setStyleState((prev) => ({
      ...prev,
      boxShadow: {
        ...prev.boxShadow,
        color: newColor,
      },
    }));
  };

  // 리셋 버튼 핸들러
  const handleReset = () => {
    setStyleState((prev) => ({
      ...prev,
      boxShadow: {
        x: "",
        y: "",
        blur: "",
        color: "",
      },
    }));
  };

  return (
    <Col xs={12} md={12}>
      <div className="info">박스 그림자</div>
      <div className="control">
        <InputGroup className="control-group">
          <InputGroup.Text id="boxShadowXControlInput">x</InputGroup.Text>
          <Form.Control type="number" placeholder="px" value={boxShadow.x} onChange={handleChange("x")} />
        </InputGroup>
        <InputGroup className="control-group">
          <InputGroup.Text id="boxShadowYControlInput">y</InputGroup.Text>
          <Form.Control type="number" placeholder="px" value={boxShadow.y} onChange={handleChange("y")} />
        </InputGroup>
        <InputGroup className="control-group">
          <InputGroup.Text id="boxShadowBlurControlInput">
            <MdBlurOn />
          </InputGroup.Text>
          <Form.Control type="number" placeholder="px" value={boxShadow.blur} onChange={handleChange("blur")} />
        </InputGroup>
        <ColorInput value={boxShadow.color} onChange={handleColorChange} />
        <button className="toggle-detail reset-button" onClick={handleReset}>
          <GrPowerReset />
        </button>
      </div>
    </Col>
  );
};

export default BoxShadowControl;
