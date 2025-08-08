import React, {useState, useRef, useEffect} from "react";
import {Col, Button} from "react-bootstrap";
import ColorPicker from "react-best-gradient-color-picker";

const BackgroundColorControl = ({backgroundColor, backgroundImage, styleState, setStyleState}) => {
  const [visible, setVisible] = useState(false);
  const pickerRef = useRef(null);
  const buttonRef = useRef(null);

  // 초기화 버튼 핸들러
  const handleUnset = () => {
    setStyleState((prev) => ({
      ...prev,
      backgroundColor: "",
      backgroundImage: "",
    }));
  };

  // 컬러피커 열고 닫기
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

  // 컬러피커에서 변경 시 자동 분기 처리
  const handleColorChange = (color) => {
    const isGradient = color.includes("gradient");
    if (isGradient) {
      setStyleState((prev) => ({
        ...prev,
        backgroundImage: color,
        backgroundColor: "",
      }));
    } else {
      setStyleState((prev) => ({
        ...prev,
        backgroundColor: color,
        backgroundImage: "",
      }));
    }
  };

  return (
    <Col xs={12}>
      <div className="info">배경 색상</div>
      <div className="control">
        <Button className="additional-button" variant="outline-info" size="sm" onClick={handleUnset}>
          unset
        </Button>
        <button
          className="show-gradient-picker"
          ref={buttonRef}
          onClick={() => setVisible((prev) => !prev)}
          style={
            backgroundImage === ""
              ? {
                  backgroundColor: backgroundColor || "#eee",
                  opacity: 0.8,
                  backgroundImage: backgroundColor === "" ? "repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), repeating-linear-gradient(45deg, #fff 25%, #eee 25%, #eee 75%, #fff 75%, #fff)" : "none",
                  backgroundPosition: "0 0, 6px 6px",
                  backgroundSize: "12px 12px",
                }
              : {background: backgroundImage}
          }
        />
        {visible && (
          <div ref={pickerRef} className="gradient-picker">
            <ColorPicker hidePresets="true" hideOpacity="true" value={backgroundImage || backgroundColor} onChange={handleColorChange} onEndChange={handleColorChange} />
          </div>
        )}
      </div>
    </Col>
  );
};

export default BackgroundColorControl;
