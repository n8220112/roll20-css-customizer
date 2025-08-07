import React from "react";
import {Col, Form} from "react-bootstrap";
import TooltipButton from "./inputs/TooltipButton";

const WidthHeightControl = ({width, height, setStyleState}) => {
  const handleWidthChange = (e) => {
    const value = e.target.value;
    setStyleState((prev) => ({
      ...prev,
      width: value ? `${value}px` : "",
    }));
  };

  const handleHeightChange = (e) => {
    const value = e.target.value;
    setStyleState((prev) => ({
      ...prev,
      height: value ? `${value}px` : "",
    }));
  };

  // px 제거한 숫자만 input에 보여주기
  const cleanNumber = (value) => (value && value.endsWith("px") ? value.replace("px", "") : value);

  return (
    <Col xs={12}>
      <div className="info">
        너비/높이
        <TooltipButton content={"디스플레이 속성이 inline-block 혹은 block일 때에만 적용됩니다. 값을 비워둔 것과 0은 구분됩니다."} />
      </div>
      <div className="control">
        <Form.Control placeholder="px" type="number" min="0" aria-label="widthControlInput" value={cleanNumber(width)} onChange={handleWidthChange} />
        <span>×</span>
        <Form.Control placeholder="px" type="number" min="0" aria-label="heightControlInput" value={cleanNumber(height)} onChange={handleHeightChange} />
      </div>
    </Col>
  );
};

export default WidthHeightControl;
