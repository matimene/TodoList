import React from "react";

export default function ListItem(props) {
  return (
    <div
      className={
        props.uiSelected === props.name
          ? "panel-item panel-selected"
          : "panel-item"
      }
      onClick={() => props.selectListFromUi(props.name)}
    >
      {props.name.toUpperCase()}
    </div>
  );
}
