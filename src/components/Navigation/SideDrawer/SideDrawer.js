import React, { Fragment } from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
  const showClass = props.show ? classes.Open : classes.Close;

  return (
    <Fragment>
      <Backdrop show={props.show} modalClosed={props.modalClosed} />
      <div onClick={props.modalClosed} className={classes.SideDrawer + " " + showClass}>
        <Logo height="11%" marginBottom="32px" />
        <nav>
          <NavigationItems loggedIn={props.loggedIn}/>
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
