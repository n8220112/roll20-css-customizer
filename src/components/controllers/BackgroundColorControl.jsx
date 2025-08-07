import React, {useState, useRef, useEffect} from "react";
import {Col, Button} from "react-bootstrap";
import ColorPicker from "react-best-gradient-color-picker";

const BackgroundColorControl = ({background, styleState, setStyleState}) => {
  const [visible, setVisible] = useState(false);
  const pickerRef = useRef(null); // ColorPicker 감지용
  const buttonRef = useRef(null); // 버튼 감지용

  const handleColorChange = (color) => {
    const parsedColor = convertToHexIfPossible(color);
    setStyleState((prev) => ({...prev, background: parsedColor}));
  };

  // HEX 변환 유틸
  const convertToHexIfPossible = (input) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return input;

    // 개별 색상 문자열 → HEX 변환
    const toHex = (colorString) => {
      ctx.fillStyle = colorString;
      const computed = ctx.fillStyle;
      if (computed.startsWith("#")) return computed;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
    };

    // linear-gradient인 경우 내부 색상 추출 및 변환
    if (input.startsWith("linear-gradient") || input.startsWith("radial-gradient")) {
      return input.replace(/(rgba?\([^)]+\)|hsla?\([^)]+\)|#[0-9a-fA-F]{3,6}|\b[a-zA-Z]+\b)/g, (match) => {
        try {
          return toHex(match);
        } catch {
          return match;
        }
      });
    }

    // 단일 색상
    return toHex(input);
  };

  // 초기화 버튼 핸들러
  const handleUnset = () => {
    setStyleState((prev) => ({...prev, background: ""}));
  };

  // 컬러피커 열고 닫히는 거 핸들러
  const handleClickOutside = (e) => {
    if (!pickerRef.current?.contains(e.target) && !buttonRef.current?.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);

  return (
    <Col xs={12}>
      <div className="info">배경 색상</div>
      <div className="control">
        <Button className="additional-button" variant="outline-info" size="sm" onClick={handleUnset}>
          unset
        </Button>
        <button
          className="show-gradient-picker"
          onClick={() => setVisible((prev) => !prev)}
          style={
            background === ""
              ? {
                  backgroundColor: "#eee",
                  opacity: 0.8,
                  backgroundImage: "repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), repeating-linear-gradient(45deg, #fff 25%, #eee 25%, #eee 75%, #fff 75%, #fff)",
                  backgroundPosition: "0 0, 6px 6px",
                  backgroundSize: "12px 12px",
                }
              : {background: background}
          }
        ></button>
        {visible && (
          <div ref={pickerRef} className="gradient-picker">
            <ColorPicker
              value={styleState.background}
              onChange={(color) => {
                // 실시간 반영은 그대로 유지
                setStyleState((prev) => ({...prev, background: color}));
              }}
              onEndChange={(color) => {
                // 조작 끝났을 때만 HEX로 변환
                const hexified = convertToHexIfPossible(color);
                setStyleState((prev) => ({...prev, background: hexified}));
              }}
            />
          </div>
        )}
      </div>
    </Col>
  );
};

export default BackgroundColorControl;
