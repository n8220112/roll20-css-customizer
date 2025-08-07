import React from "react";
import {useState, useRef} from "react";
import {Alert, Form} from "react-bootstrap";

const CopyCompleteCodeButton = ({styleState, userText}) => {
  const [descOn, setDescOn] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const timeoutRef = useRef(null); //이전 타이머를 저장하기 위한 ref

  const handleCopy = () => {
    const lines = [];

    const {fontSize, letterSpacing, textAlign, fontWeight, fontStyle, textDecoration, color, background, display, width, height, margin, padding, border, borderRadius, textShadow, boxShadow} = styleState;

    // 조건부 생략
    if (fontSize) lines.push(`font-size: ${fontSize};`);
    if (letterSpacing) lines.push(`letter-spacing: ${letterSpacing};`);
    if (textAlign) lines.push(`text-align: ${textAlign};`);
    if (fontWeight && fontWeight !== "bold") lines.push(`font-weight: ${fontWeight};`);
    if (fontStyle && fontStyle !== "italic") lines.push(`font-style: ${fontStyle};`);
    if (Array.isArray(textDecoration) && textDecoration.filter(Boolean).length > 0) {
      lines.push(`text-decoration: ${textDecoration.join(" ")};`);
    }
    if (color) lines.push(`color: ${color};`);
    if (background) lines.push(`background: ${background};`);
    if (display && display !== "inline") lines.push(`display: ${display};`);
    if (width) lines.push(`width: ${width};`);
    if (height) lines.push(`height: ${height};`);

    // shorthand: margin
    const marginVals = [margin.top, margin.right, margin.bottom, margin.left];
    const isAllAuto = marginVals.every((v) => v === "auto");
    if (isAllAuto) {
      lines.push("margin: auto;");
    } else if (marginVals.some((v) => v)) {
      lines.push(`margin: ${marginVals.map((v) => (v === "auto" ? "auto" : v ? `${v}px` : "0px")).join(" ")};`);
    }

    // shorthand: padding
    const padVals = [padding.top, padding.right, padding.bottom, padding.left];
    if (padVals.some((v) => v)) {
      lines.push(`padding: ${padVals.map((v) => (v ? `${v}px` : "0px")).join(" ")};`);
    }

    // border (조건부)
    const hasBorderStyle = border.style && border.style !== "none";
    if (hasBorderStyle) {
      const borderWidth = `${border.width.top || 0}px ${border.width.right || 0}px ${border.width.bottom || 0}px ${border.width.left || 0}px`;
      lines.push(`border-width: ${borderWidth};`);
      lines.push(`border-style: ${border.style};`);
      if (border.color) lines.push(`border-color: ${border.color};`);
    }

    // shorthand: border-radius
    const radiusVals = [borderRadius.top, borderRadius.right, borderRadius.bottom, borderRadius.left];
    if (radiusVals.some((v) => v)) {
      lines.push(`border-radius: ${radiusVals.map((v) => (v ? `${v}px` : "0px")).join(" ")};`);
    }

    // shorthand: text-shadow
    if (textShadow.x && textShadow.y && textShadow.blur && textShadow.color) {
      lines.push(`text-shadow: ${textShadow.x}px ${textShadow.y}px ${textShadow.blur}px ${textShadow.color};`);
    }

    // shorthand: box-shadow
    if (boxShadow.x && boxShadow.y && boxShadow.blur && boxShadow.color) {
      lines.push(`box-shadow: ${boxShadow.x}px ${boxShadow.y}px ${boxShadow.blur}px ${boxShadow.color};`);
    }

    const style = lines.join(" ");
    let result;
    descOn ? (result = `/desc [${userText}](#" style="${style})`) : (result = `[${userText}](#" style="${style})`);

    navigator.clipboard.writeText(result).then(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setShow(true);
      timeoutRef.current = setTimeout(() => {
        setShow(false);
      }, 3000);
    });
  };

  return (
    <>
      <button ref={target} onClick={handleCopy}>
        복사하기
      </button>
      <Form.Check label="/desc 포함" onChange={() => setDescOn(!descOn)} />
      <Alert target={target.current} show={show} variant="primary">
        클립보드에 복사되었습니다.
      </Alert>
    </>
  );
};

export default CopyCompleteCodeButton;
