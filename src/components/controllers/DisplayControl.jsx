import React from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";

const DisplayControl = ({display, setStyleState}) => {
  const displayOptions = ["inline", "inline-block", "block"];

  const handleSelect = (selectedValue) => {
    setStyleState((prev) => ({
      ...prev,
      display: selectedValue,
    }));
  };
  return (
    <DropdownButton
      title={display || "inline"}
      size="sm"
      variant="info"
      onSelect={handleSelect}
    >
      {displayOptions.map((option) => (
        <Dropdown.Item key={option} eventKey={option}>
          {option}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default DisplayControl;
