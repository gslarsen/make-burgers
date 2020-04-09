import React from "react";

import classes from './BuildControl.module.css';

const BuildControl = (props) => {
  
  return(
  <div className={classes.BuildControl}>
    <div className={classes.Label} type={props.type}>{props.label}</div>
    <button className={classes.Less} onClick={(e) => props.select(e, props.type)} disabled={!props.quantity}>Less</button>
    <button className={classes.More} onClick={(e) => props.select(e, props.type)}>More</button>
  </div>
)};

export default BuildControl;

