import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render = () => {
    return (
      <Fragment>
        <Toolbar
          loggedIn={this.props.isAuthenticated}
          sideDrawerToggle={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          loggedIn={this.props.isAuthenticated}
          show={this.state.showSideDrawer}
          modalClosed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token || false,
  };
};

export default connect(mapStateToProps)(Layout);
