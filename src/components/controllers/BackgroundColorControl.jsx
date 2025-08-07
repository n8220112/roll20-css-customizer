import React, {useState, useRef, useEffect} from "react";
import {Col, Button} from "react-bootstrap";
import ColorPicker from "react-best-gradient-color-picker";

const BackgroundColorControl = ({background, setStyleState}) => {
  const [visible, setVisible] = useState(false);
  const pickerRef = useRef(null); // ColorPicker 감지용
  const buttonRef = useRef(null); // 버튼 감지용

  const handleColorChange = (color) => {
    setStyleState((prev) => ({...prev, background: color}));
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
            <ColorPicker value={background} onChange={handleColorChange} />
          </div>
        )}
      </div>
    </Col>
  );
};

export default BackgroundColorControl;
