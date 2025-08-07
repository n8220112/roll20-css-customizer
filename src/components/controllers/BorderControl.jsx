import React, {useState} from "react";
import {Dropdown, DropdownButton, Col, Form, InputGroup} from "react-bootstrap";
import {TbBorderOuter, TbBorderLeft, TbBorderTop, TbBorderRight, TbBorderBottom} from "react-icons/tb";
import ColorInput from "./inputs/ColorInput";

const BorderControl = ({border, setStyleState}) => {
  const [showDetail, setShowDetail] = useState(false);

  // 전체 너비 일괄 변경
  const handleAllWidthChange = (e) => {
    const value = e.target.value;
    const all = {top: value, right: value, bottom: value, left: value};
    setStyleState((prev) => ({
      ...prev,
      border: {
        ...prev.border,
        width: all,
      },
    }));
  };

  // 개별 너비 변경
  const handleSingleWidthChange = (side) => (e) => {
    const value = e.target.value;
    setStyleState((prev) => ({
      ...prev,
      border: {
        ...prev.border,
        width: {
          ...prev.border.width,
          [side]: value,
        },
      },
    }));
  };

  // 스타일 선택
  const handleStyleSelect = (style) => {
    setStyleState((prev) => ({
      ...prev,
      border: {
        ...prev.border,
        style: style === "none" ? "" : style,
      },
    }));
  };

  // 색상 변경
  const handleColorChange = (newColor) => {
    setStyleState((prev) => ({
      ...prev,
      border: {
        ...prev.border,
        color: newColor,
      },
    }));
  };

  return (
    <Col xs={12} md={12}>
      <div className="info">테두리</div>

      <div className="control">
        <Form.Control placeholder="px" type="number" min="0" value={border.width.top || ""} onChange={handleAllWidthChange} />
        <button className="toggle-detail" type="button" onClick={() => setShowDetail((prev) => !prev)}>
          <TbBorderOuter />
        </button>
      </div>

      {showDetail && (
        <div className="control additional-control">
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbBorderTop />
            </InputGroup.Text>
            <Form.Control type="number" placeholder="px" value={border.width.top} onChange={handleSingleWidthChange("top")} />
          </InputGroup>
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbBorderRight />
            </InputGroup.Text>
            <Form.Control type="number" placeholder="px" value={border.width.right} onChange={handleSingleWidthChange("right")} />
          </InputGroup>
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbBorderBottom />
            </InputGroup.Text>
            <Form.Control type="number" placeholder="px" value={border.width.bottom} onChange={handleSingleWidthChange("bottom")} />
          </InputGroup>
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbBorderLeft />
            </InputGroup.Text>
            <Form.Control type="number" placeholder="px" value={border.width.left} onChange={handleSingleWidthChange("left")} />
          </InputGroup>
        </div>
      )}

      <div className="control additional-control">
        <div className="info">모양</div>
        <DropdownButton title={border.style === "" ? "none" : border.style} size="sm" variant="info" onSelect={handleStyleSelect}>
          {["none", "solid", "dotted", "dashed", "double", "groove", "ridge", "inset", "outset"].map((style) => (
            <Dropdown.Item key={style} eventKey={style}>
              {style}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <div className="info">색상</div>
        <ColorInput value={border.color} onChange={handleColorChange} />
      </div>
    </Col>
  );
};

export default BorderControl;
