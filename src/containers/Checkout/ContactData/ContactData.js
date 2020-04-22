import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      // city: "",
      // state: "",
      // country: "",
      postalCode: "",
    },
  };

  componentDidMount() {

  }

  submitOrderHandler = (e) => {
    debugger
    e.preventDefault();
    console.log('CLICKED!', e);
  }

  render() {
    console.log('ContactData props:', this.props)
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact info</h4>
        <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
          <input className={classes.Input} type="email" name="email" placeholder="Your email" />
          <input className={classes.Input} type="text" name="street" placeholder="Street" />
          <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
          <input type="submit" onClick={(e) => this.submitOrderHandler(e)} value="ORDER"/>
        </form>
      </div>
    );
  }
}

export default ContactData;
