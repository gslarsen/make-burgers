import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";

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
    loading: false,
  };

  componentDidMount() {
    // console.log('Component did MOUNT')
    // console.log('this.state:', this.state)
  }

  componentDidUpdate() {
    // console.log('Component did UPDATE')
    // console.log('this.state:', this.state)
    // this.submitOrder();
  }

  orderHandler = (e) => {
    e.preventDefault();

    // get customer input from form
    const customer = {
      name: e.target.parentElement.elements["name"].value,
      email: e.target.parentElement.elements["email"].value,
      address: {
        street: e.target.parentElement.elements["street"].value,
        postalCode: e.target.parentElement.elements["postal"].value,
      },
    };
    this.setState(customer);
    this.submitOrder({
      customer,
      totalPrice: this.props.totalPrice,
      ingredients: this.props.ingredients,
    });

    // clear form
    e.target.parentElement.elements["name"].value = "";
    e.target.parentElement.elements["email"].value = "";
    e.target.parentElement.elements["street"].value = "";
    e.target.parentElement.elements["postal"].value = "";
  };

  submitOrder = (order) => {
    // firebase endpoint, so use .json extension
    this.setState({ loading: true });

    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push('/', {});
      })
      .catch((error) => {
        this.setState({ loading: false });
        this.props.err(true, error.message);
      });
  };

  render() {
    // console.log('ContactData props:', this.props)
    let output = (
      <div className={classes.ContactData}>
        <h4>Enter your contact info</h4>
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Your Name"
          />
          <input
            className={classes.Input}
            type="email"
            name="email"
            placeholder="Your email"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Street"
          />
          <input
            className={classes.Input}
            type="text"
            name="postal"
            placeholder="Postal Code"
          />
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      </div>
    );

    if (this.state.loading) output = <Spinner />;
    return output;
  }
}

export default ContactData;
