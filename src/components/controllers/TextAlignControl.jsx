import React from "react";
import {AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight} from "react-icons/ai";

const TextAlignControl = ({textAlign, setStyleState}) => {
  const handleChange = (value) => {
    setStyleState((prev) => ({
      ...prev,
      textAlign: prev.textAlign === value ? "" : value,
    }));
  };

  return (
    <>
      <button className={textAlign === "left" ? "on" : ""} onClick={() => handleChange("left")}>
        <AiOutlineAlignLeft />
      </button>
      <button className={textAlign === "center" ? "on" : ""} onClick={() => handleChange("center")}>
        <AiOutlineAlignCenter />
      </button>
      <button className={textAlign === "right" ? "on" : ""} onClick={() => handleChange("right")}>
        <AiOutlineAlignRight />
      </button>
      {/* <button onClick={() => handleChange("")}>
        <RxReset />
      </button> */}
    </>
  );
};

export default TextAlignControl;
