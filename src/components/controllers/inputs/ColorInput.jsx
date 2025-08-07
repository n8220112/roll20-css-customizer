import React, {useState, useEffect} from "react";

const ColorInput = ({value = "#000000", onChange}) => {
  const [colorValue, setColorValue] = useState(value);

  // 외부에서 변경 시 내부에도 반영
  useEffect(() => {
    setColorValue(value);
  }, [value]);

  // HEX 변경 처리 (입력 중)
  const handleHexChange = (e) => {
    let input = e.target.value;

    // # 제거
    if (input.startsWith("#")) {
      input = input.slice(1);
    }

    // 최대 6자리 제한
    if (input.length > 6) input = input.slice(0, 6);

    const newColor = `#${input}`;
    setColorValue(newColor);
    onChange?.(newColor); // 변경 즉시 반영 (입력 실시간 반영은 유지)
  };

  // 포커스 아웃 시 3자리 → 6자리 확장
  const handleHexBlur = () => {
    const raw = colorValue.replace("#", "");

    if (raw.length === 3) {
      const expanded = raw
        .split("")
        .map((char) => char + char)
        .join("");
      const newColor = `#${expanded}`;
      setColorValue(newColor);
      onChange?.(newColor); // 확장된 값 반영
    }
  };

  return (
    <div className="control-group-color">
      <input type="color" value={colorValue} onChange={handleHexChange} name="color input" />
      <input
        type="text"
        value={colorValue}
        placeholder="#HEX"
        onChange={handleHexChange}
        onBlur={handleHexBlur} // 포커스 해제 시 확장 적용
      />
    </div>
  );
};

export default ColorInput;
