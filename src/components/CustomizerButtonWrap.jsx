import React from "react";
import {useState, useRef} from "react";

import ResetStyleStateButton from "./ResetStyleStateButton";

import {Alert, Form} from "react-bootstrap";

const CustomizerButtonWrap = ({setStyleState, styleState, userText}) => {
  /* copy */
  const [descOn, setDescOn] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const timeoutRef = useRef(null); //이전 타이머를 저장하기 위한 ref

  // 네 방향이 동일한 값일 시 합치기
  function getShorthandOrFull(values, propertyName) {
    const [top, right, bottom, left] = values;

    // 4개가 모두 같을 경우
    if (top && top === right && right === bottom && bottom === left) {
      return `${propertyName}: ${top}px;`;
    }

    // 일부 값이 비어있으면 0 처리
    const safe = values.map((v) => (v ? `${v}px` : "0px"));
    return `${propertyName}: ${safe.join(" ")};`;
  }

  const handleCopy = () => {
    const lines = [];

    const {fontSize, letterSpacing, textAlign, fontWeight, fontStyle, textDecoration, color, display, width, height, margin, padding, border, borderRadius, textShadow, boxShadow, background} = styleState;

    // HEX 변환기
    const convertToHexIfPossible = (input) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return input;

      const toHex = (colorString) => {
        ctx.fillStyle = colorString;
        const computed = ctx.fillStyle;
        if (computed.startsWith("#")) return computed;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
      };

      if (input.startsWith("linear-gradient") || input.startsWith("radial-gradient")) {
        return input.replace(/(rgba?\([^)]+\)|hsla?\([^)]+\)|#[0-9a-fA-F]{3,6}|\b[a-zA-Z]+\b)/g, (match) => {
          try {
            return toHex(match);
          } catch {
            return match;
          }
        });
      }

      return toHex(input);
    };

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
    if (display && display !== "inline") lines.push(`display: ${display};`);
    if (width) lines.push(`width: ${width};`);
    if (height) lines.push(`height: ${height};`);
    if (background) lines.push(`background: ${convertToHexIfPossible(background)};`);

    // margin
    const marginVals = [margin.top, margin.right, margin.bottom, margin.left];
    const isAllAuto = marginVals.every((v) => v === "auto");
    if (isAllAuto) {
      lines.push("margin: auto;");
    } else if (marginVals.some((v) => v)) {
      if (marginVals.every((v) => v && v === marginVals[0])) {
        lines.push(`margin: ${marginVals[0]}px;`);
      } else {
        const safe = marginVals.map((v) => (v === "auto" ? "auto" : v ? `${v}px` : "0px"));
        lines.push(`margin: ${safe.join(" ")};`);
      }
    }

    // padding
    const padVals = [padding.top, padding.right, padding.bottom, padding.left];
    if (padVals.some((v) => v)) {
      lines.push(getShorthandOrFull(padVals, "padding"));
    }

    // border-width (조건: borderStyle이 "none"이 아닐 때)
    const hasBorderStyle = border.style && border.style !== "none";
    if (hasBorderStyle) {
      const widthVals = [border.width.top, border.width.right, border.width.bottom, border.width.left];
      lines.push(getShorthandOrFull(widthVals, "border-width"));
      lines.push(`border-style: ${border.style};`);
      if (border.color) lines.push(`border-color: ${border.color};`);
    }

    // border-radius
    const radiusVals = [borderRadius.top, borderRadius.right, borderRadius.bottom, borderRadius.left];
    if (radiusVals.some((v) => v)) {
      lines.push(getShorthandOrFull(radiusVals, "border-radius"));
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
    descOn ? (result = `/desc [${userText.split("\n").join(" ")}](#" style="${style})`) : (result = `[${userText.split("\n").join(" ")}](#" style="${style})`);

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
      <div className="customizer-buttons-wrap">
        <Form.Check id="includeDesc" label="/desc 포함" onChange={() => setDescOn(!descOn)} />
        <div className="buttons">
          <ResetStyleStateButton setStyleState={setStyleState} />
          <button ref={target} onClick={handleCopy}>
            복사하기
          </button>
        </div>
        <Alert target={target.current} show={show} variant="primary">
          클립보드에 복사되었습니다.
        </Alert>
      </div>
    </>
  );
};

export default CustomizerButtonWrap;
