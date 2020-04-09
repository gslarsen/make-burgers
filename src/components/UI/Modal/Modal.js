import React, { Fragment } from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => (
  <Fragment>
    <Backdrop show={props.show} modalClosed={props.modalClosed}/>
    <div
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
      className={classes.Modal}
    >
      {props.children}
    </div>
  </Fragment>
);

export default Modal;
