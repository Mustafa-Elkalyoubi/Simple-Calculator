import React from "react";
import "./button.css";

const isOperator = (val) => {
  return !isNaN(val) || val === "." || val === "=";
};

export const Button = (props) => (
  <div
    style={
      props.children === "=" ? { backgroundColor: "green", color: "white" } : {}
    }
    className={`button-wrapper${isOperator(props.children) ? "" : " operator"}`}
    onClick={() => props.handleClick(props.children)}
  >
    {props.children}
  </div>
);
