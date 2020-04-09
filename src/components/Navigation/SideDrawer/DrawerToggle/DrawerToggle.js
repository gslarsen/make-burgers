import React from "react";

import classes from './DrawerToggle.module.css';

const DrawerToggle = (props) => 
<div onClick={props.sideDrawerToggle} className={classes.DrawerToggle}>
  <div></div>
  <div></div>
  <div></div>
</div>

export default DrawerToggle;
