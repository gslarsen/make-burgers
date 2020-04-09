import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle sideDrawerToggle={props.sideDrawerToggle}>MENU</DrawerToggle>
    <Logo height="80%" marginBottom="0"/>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;