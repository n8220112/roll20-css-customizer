import React from "react";

const ResetStyleStateButton = ({setStyleState}) => {
  function handleResetStyleState() {
    setStyleState({
      fontSize: "",
      letterSpacing: "",
      textAlign: "",
      fontWeight: "",
      fontStyle: "",
      textDecoration: [""],
      color: "",
      background: "",
      textShadow: {x: "", y: "", blur: "", color: ""},
      boxShadow: {x: "", y: "", blur: "", color: ""},
      display: "",
      width: "",
      height: "",
      padding: {
        top: "",
        right: "",
        bottom: "",
        left: "",
      },
      margin: {
        top: "",
        right: "",
        bottom: "",
        left: "",
      },
      border: {
        width: {top: "", right: "", bottom: "", left: ""},
        style: "",
        color: "",
      },
      borderRadius: {
        top: "",
        right: "",
        bottom: "",
        left: "",
      },
    });
  }
  return <button onClick={handleResetStyleState}>처음부터</button>;
};

export default ResetStyleStateButton;
