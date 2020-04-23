import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = <input className={classes.InputElement} {...props.elementConfig} />;
      break;
    case "textarea":
      inputElement = <textarea className={classes.InputElement} {...props.elementConfig} />;
      break;
    case "select":
      const options = (props.elementConfig.options).map((option) => {
        return <option key={option.name} name={option.name}>{option.displayValue}</option>;
      });

      inputElement = (
        <select className={classes.InputElement} {...props.elementConfig}>
          {options}
        </select>
      );
      break;
    default:
      inputElement = <input className={classes.InputElement} {...props} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
