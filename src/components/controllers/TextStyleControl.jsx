import React from "react";
import {BsTypeBold, BsTypeItalic, BsTypeStrikethrough, BsTypeUnderline} from "react-icons/bs";
import {RxTextNone} from "react-icons/rx";

const TextStyleControl = ({fontWeight, fontStyle, textDecoration, setStyleState}) => {
  const handleToggleFontWeight = () => {
    setStyleState((prev) => ({
      ...prev,
      fontWeight: prev.fontWeight === "" ? "normal" : "",
    }));
  };

  const handleToggleFontStyle = () => {
    setStyleState((prev) => ({
      ...prev,
      fontStyle: prev.fontStyle === "" ? "normal" : "",
    }));
  };

  const handleToggleUnderline = () => {
    setStyleState((prev) => {
      let current = Array.isArray(prev.textDecoration) ? prev.textDecoration : [];
      current = current.filter((v) => v !== "none"); // none 제거
      const updated = current.includes("underline") ? current.filter((v) => v !== "underline") : [...current, "underline"];
      return {...prev, textDecoration: updated};
    });
  };

  const handleToggleStrikethrough = () => {
    setStyleState((prev) => {
      let current = Array.isArray(prev.textDecoration) ? prev.textDecoration : [];
      current = current.filter((v) => v !== "none"); // none 제거
      const updated = current.includes("line-through") ? current.filter((v) => v !== "line-through") : [...current, "line-through"];
      return {...prev, textDecoration: updated};
    });
  };

  const handleToggleNone = () => {
    setStyleState((prev) => ({
      ...prev,
      textDecoration: ["none"],
    }));
  };

  const isUnderline = Array.isArray(textDecoration) && textDecoration.includes("underline");
  const isStrikethrough = Array.isArray(textDecoration) && textDecoration.includes("line-through");
  const isNone = textDecoration.includes("none");

  return (
    <>
      <button className={fontWeight === "" ? "on" : ""} onClick={handleToggleFontWeight}>
        <BsTypeBold />
      </button>
      <button className={fontStyle === "" ? "on" : ""} onClick={handleToggleFontStyle}>
        <BsTypeItalic />
      </button>
      <button className={isStrikethrough ? "on" : ""} onClick={handleToggleStrikethrough}>
        <BsTypeStrikethrough />
      </button>
      <button className={isUnderline ? "on" : ""} onClick={handleToggleUnderline}>
        <BsTypeUnderline />
      </button>
      <button className={isNone ? "on" : ""} onClick={handleToggleNone}>
        <RxTextNone />
      </button>
    </>
  );
};

export default TextStyleControl;
