import React from "react";
import {useState, useEffect} from "react";
import {Col, Form, InputGroup} from "react-bootstrap";
import {TbBorderOuter, TbRadiusTopLeft, TbRadiusTopRight, TbRadiusBottomLeft, TbRadiusBottomRight} from "react-icons/tb";
import TooltipButton from "./inputs/TooltipButton";

const BorderRadiusControl = ({borderRadius, setStyleState}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [radius, setRadius] = useState({
    top: "",
    right: "",
    bottom: "",
    left: "",
  });

  // 모든 모서리에 동일한 값 적용
  const handleAllChange = (e) => {
    const value = e.target.value;
    const newRadius = {
      top: value,
      right: value,
      bottom: value,
      left: value,
    };
    setRadius(newRadius);
    setStyleState((prev) => ({...prev, borderRadius: newRadius}));
  };

  // 개별 모서리 변경
  const handleSingleChange = (side) => (e) => {
    const value = e.target.value;
    const updated = {...radius, [side]: value};
    setRadius(updated);
    setStyleState((prev) => ({...prev, borderRadius: updated}));
  };

  // 초기값 동기화 (선택)
  useEffect(() => {
    if (borderRadius) {
      setRadius(borderRadius);
    }
  }, [borderRadius]);

  return (
    <Col xs={12} md={12}>
      <div className="info">
        둥글기
        <TooltipButton content="모서리의 둥글기를 정합니다. 배경이나 테두리가 있어야 눈에 보입니다." />
      </div>
      <div className="control">
        <Form.Control placeholder="px" type="number" min="0" aria-label="borderRadiusControlInput" value={radius.top || ""} onChange={handleAllChange} />
        <button type="button" className="toggle-detail" onClick={() => setShowDetail((prev) => !prev)}>
          {/* 이 버튼을 누르면 .additional-control 섹션이 나타남 */}
          <TbBorderOuter />
        </button>
      </div>
      {showDetail && (
        <div className="control additional-control">
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbRadiusTopLeft />
            </InputGroup.Text>
            <Form.Control placeholder="px" type="number" min="0" value={radius.top} onChange={handleSingleChange("top")} />
          </InputGroup>
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbRadiusTopRight />
            </InputGroup.Text>
            <Form.Control placeholder="px" type="number" min="0" value={radius.right} onChange={handleSingleChange("right")} />
          </InputGroup>
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbRadiusBottomRight />
            </InputGroup.Text>
            <Form.Control placeholder="px" type="number" min="0" value={radius.bottom} onChange={handleSingleChange("bottom")} />
          </InputGroup>
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbRadiusBottomLeft />
            </InputGroup.Text>
            <Form.Control placeholder="px" type="number" min="0" value={radius.left} onChange={handleSingleChange("left")} />
          </InputGroup>
        </div>
      )}
    </Col>
  );
};

export default BorderRadiusControl;
