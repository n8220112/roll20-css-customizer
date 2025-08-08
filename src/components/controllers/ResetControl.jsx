import React from "react";
import Form from "react-bootstrap/Form";
import {useEffect} from "react";

const ResetControl = ({styleState, setStyleState}) => {
  const isResetOn = styleState.color === "#404040" && styleState.fontStyle === "normal" && styleState.textDecoration === "none" && styleState.display === "inline-block";

  const handleToggle = () => {
    if (isResetOn) {
      // OFF → 원래 상태로 복구
      setStyleState((prev) => ({
        ...prev,
        color: "",
        fontStyle: "",
        textDecoration: "",
        display: "",
      }));
    } else {
      // ON → 리셋 적용
      setStyleState((prev) => ({
        ...prev,
        color: "#404040",
        fontStyle: "normal",
        textDecoration: "none",
        display: "inline-block",
      }));
    }
  };

  useEffect(() => {
    setStyleState((prev) => ({
      ...prev,
      color: "#404040",
      fontStyle: "normal",
      textDecoration: "none",
      display: "inline-block",
    }));
  }, [setStyleState]);

  return (
    <Form>
      <Form.Check type="switch" id="resetToggle" aria-label="리셋 스위치" checked={isResetOn} onChange={handleToggle} />
    </Form>
  );
};

export default ResetControl;
