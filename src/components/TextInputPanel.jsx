import React from "react";
import {Container, Row, Col, Form, FloatingLabel} from "react-bootstrap";

const TextInputPanel = ({userText, setUserText}) => {
  return (
    <Container className="card-container text-input-panel">
      <Row>
        <Col xs={12}>
          <h2>Text Input</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <FloatingLabel controlId="floatingTextarea" label="문장을 입력하세요">
            <Form.Control as="textarea" spellCheck="false" placeholder="문장을 입력하세요" value={userText} onChange={(e) => setUserText(e.target.value)} />
          </FloatingLabel>
        </Col>
      </Row>
    </Container>
  );
};

export default TextInputPanel;
