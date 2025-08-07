import React, {useState, useEffect} from "react";
import {Col, Form, InputGroup} from "react-bootstrap";
import {TbBoxPadding, TbBoxAlignLeft, TbBoxAlignTop, TbBoxAlignRight, TbBoxAlignBottom} from "react-icons/tb";

const PaddingControl = ({padding, setStyleState}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [localPadding, setLocalPadding] = useState({
    top: "",
    right: "",
    bottom: "",
    left: "",
  });

  // padding 값 초기 반영
  useEffect(() => {
    if (padding) setLocalPadding(padding);
  }, [padding]);

  // 모든 방향 동일 적용
  const handleAllPaddingChange = (e) => {
    const value = e.target.value;
    const updated = {
      top: value,
      right: value,
      bottom: value,
      left: value,
    };
    setLocalPadding(updated);
    setStyleState((prev) => ({
      ...prev,
      padding: updated,
    }));
  };

  // 개별 방향 설정
  const handleSinglePaddingChange = (side) => (e) => {
    const value = e.target.value;
    const updated = {...localPadding, [side]: value};
    setLocalPadding(updated);
    setStyleState((prev) => ({
      ...prev,
      padding: updated,
    }));
  };

  return (
    <Col xs={12} md={12}>
      <div className="info">패딩</div>
      <div className="control">
        <Form.Control placeholder="px" type="number" min="0" aria-label="paddingControlInput" value={localPadding.top} onChange={handleAllPaddingChange} />
        <button className="toggle-detail" type="button" onClick={() => setShowDetail((prev) => !prev)}>
          <TbBoxPadding />
        </button>
      </div>

      {showDetail && (
        <div className="control additional-control">
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbBoxAlignTop />
            </InputGroup.Text>
            <Form.Control type="number" placeholder="px" value={localPadding.top} onChange={handleSinglePaddingChange("top")} />
          </InputGroup>
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbBoxAlignRight />
            </InputGroup.Text>
            <Form.Control type="number" placeholder="px" value={localPadding.right} onChange={handleSinglePaddingChange("right")} />
          </InputGroup>
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbBoxAlignBottom />
            </InputGroup.Text>
            <Form.Control type="number" placeholder="px" value={localPadding.bottom} onChange={handleSinglePaddingChange("bottom")} />
          </InputGroup>
          <InputGroup className="control-group">
            <InputGroup.Text>
              <TbBoxAlignLeft />
            </InputGroup.Text>
            <Form.Control type="number" placeholder="px" value={localPadding.left} onChange={handleSinglePaddingChange("left")} />
          </InputGroup>
        </div>
      )}
    </Col>
  );
};

export default PaddingControl;
