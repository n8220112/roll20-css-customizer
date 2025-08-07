import React from "react";
import {BsTypeBold, BsTypeItalic, BsTypeStrikethrough, BsTypeUnderline} from "react-icons/bs";

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
      const current = Array.isArray(prev.textDecoration) ? prev.textDecoration : [];
      const updated = current.includes("underline") ? current.filter((v) => v !== "underline") : [...current, "underline"];
      return {...prev, textDecoration: updated};
    });
  };

  const handleToggleStrikethrough = () => {
    setStyleState((prev) => {
      const current = Array.isArray(prev.textDecoration) ? prev.textDecoration : [];
      const updated = current.includes("line-through") ? current.filter((v) => v !== "line-through") : [...current, "line-through"];
      return {...prev, textDecoration: updated};
    });
  };

  const isUnderline = Array.isArray(textDecoration) && textDecoration.includes("underline");
  const isStrikethrough = Array.isArray(textDecoration) && textDecoration.includes("line-through");

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
    </>
  );
};

export default TextStyleControl;
