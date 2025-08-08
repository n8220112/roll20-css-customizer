import React, {useState, useEffect} from "react";
import {Col, Form, InputGroup} from "react-bootstrap";
import {TbBoxMargin, TbBoxAlignLeft, TbBoxAlignTop, TbBoxAlignRight, TbBoxAlignBottom} from "react-icons/tb";
import TooltipButton from "./inputs/TooltipButton";

const MarginControl = ({margin, setStyleState}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [localMargin, setLocalMargin] = useState({
    top: "",
    right: "",
    bottom: "",
    left: "",
  });
  const [useAuto, setUseAuto] = useState(false);

  useEffect(() => {
    if (margin) setLocalMargin(margin);
  }, [margin]);

  const handleAllMarginChange = (e) => {
    const value = e.target.value;
    const updated = {
      top: value,
      right: value,
      bottom: value,
      left: value,
    };
    setLocalMargin(updated);
    setStyleState((prev) => ({
      ...prev,
      margin: updated,
    }));
  };

  const handleSingleMarginChange = (side) => (e) => {
    const value = e.target.value;
    const updated = {...localMargin, [side]: value};
    setLocalMargin(updated);
    setStyleState((prev) => ({
      ...prev,
      margin: updated,
    }));
  };

  const handleAutoToggle = () => {
    const newUseAuto = !useAuto;
    setUseAuto(newUseAuto);

    const updated = {
      ...localMargin,
      top: newUseAuto ? "auto" : "",
      right: newUseAuto ? "auto" : "",
      bottom: newUseAuto ? "auto" : "",
      left: newUseAuto ? "auto" : "",
    };
    setLocalMargin(updated);
    setStyleState((prev) => ({
      ...prev,
      margin: updated,
    }));
  };

  return (
    <Col xs={12} md={12}>
      <div className="info">
        마진
        <TooltipButton content="텍스트의 바깥에 여백을 둡니다. 태그와 태그 사이의 거리를 벌립니다. <br/>너비값을 적용한 요소를 가운데에 정렬하고 싶다면 auto를 사용하세요." />
      </div>

      <div className="control">
        <button className={useAuto ? "on" : ""} onClick={handleAutoToggle}>
          auto
        </button>
        <Form.Control placeholder="px" type="number" min="0" aria-label="marginControlInput" value={useAuto ? "" : localMargin.top} onChange={handleAllMarginChange} disabled={useAuto} />
        <button className="toggle-detail" type="button" onClick={() => setShowDetail((prev) => !prev)}>
          <TbBoxMargin />
        </button>
      </div>

      {showDetail && (
        <div className="control additional-control">
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbBoxAlignTop />
            </InputGroup.Text>
            <Form.Control type="number" placeholder="px" value={localMargin.top} onChange={handleSingleMarginChange("top")} disabled={useAuto} />
          </InputGroup>
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbBoxAlignRight />
            </InputGroup.Text>
            <Form.Control type="number" placeholder="px" value={localMargin.right === "auto" ? "" : localMargin.right} onChange={handleSingleMarginChange("right")} disabled={useAuto} />
          </InputGroup>
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbBoxAlignBottom />
            </InputGroup.Text>
            <Form.Control type="number" placeholder="px" value={localMargin.bottom} onChange={handleSingleMarginChange("bottom")} disabled={useAuto} />
          </InputGroup>
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbBoxAlignLeft />
            </InputGroup.Text>
            <Form.Control type="number" placeholder="px" value={localMargin.left === "auto" ? "" : localMargin.left} onChange={handleSingleMarginChange("left")} disabled={useAuto} />
          </InputGroup>
        </div>
      )}
    </Col>
  );
};

export default MarginControl;
