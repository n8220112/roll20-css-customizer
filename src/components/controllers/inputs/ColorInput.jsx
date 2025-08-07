import React from "react";
import {useState, useEffect} from "react";

const ColorInput = ({value = "#000000", onChange}) => {
  const [colorValue, setColorValue] = useState(value);

  // 외부에서 변경 시 내부에도 반영
  useEffect(() => {
    setColorValue(value);
  }, [value]);

  /* 인풋 변경 */
  // 3자리수 자동 채우기
  const expandHex = (input) => {
    return input.length === 3
      ? input
          .split("")
          .map((char) => char + char)
          .join("")
      : input;
  };

  const handleHexChange = (e) => {
    let input = e.target.value;

    // 사용자가 입력한 값에서 맨 앞의 # 제거 (있든 없든)
    if (input.startsWith("#")) {
      input = input.slice(1);
    }

    // 최대 6자리로 제한
    if (input.length > 6) input = input.slice(0, 6);
    // 3자리면 6자리로 확장
    const expanded = expandHex(input);

    const newColor = `#${expanded}`;
    setColorValue(newColor);
    onChange?.(newColor);
  };

  return (
    <div className="control-group-color">
      <input type="color" value={colorValue} onChange={handleHexChange} name="color input" />
      {/* HEX 코드를 직접 입력해서도 컬러 지정 가능 */}
      <input type="text" value={colorValue} placeholder="#HEX" onChange={handleHexChange} />
    </div>
  );
};

export default ColorInput;
