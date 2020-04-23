import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Name",
          name: "name",
          placeholder: "Your Name",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          label: "Email",
          name: "email",
          placeholder: "Your email",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Street",
          name: "street",
          placeholder: "Street",
        },
        value: "",
      },
      postal: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Postal Code",
          name: "postal",
          placeholder: "Postal Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Country",
          name: "country",
          placeholder: "Country",
        },
        value: "",
      },
      delivery: {
        elementType: "select",
        elementConfig: {
          options: [{ name: "standard", displayValue: "Standard" }, { name: "overnight", displayValue: "Overnight" }],
          label: "Delivery Method",
          name: "delivery",
        },
        value: "Standard",
      }
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    console.dir(e.target.parentElement);
    // get customer Input from form
    const customer = {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Name",
          name: "name",
          placeholder: "Your Name",
        },
        value: e.target.parentElement.elements["name"].value,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          label: "Email",
          name: "email",
          placeholder: "Your email",
        },
        value: e.target.parentElement.elements["email"].value,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Street",
          name: "street",
          placeholder: "Street",
        },
        value: e.target.parentElement.elements["street"].value,
      },
      postal: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Postal Code",
          name: "postal",
          placeholder: "Postal Code",
        },
        value: e.target.parentElement.elements["postal"].value,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Country",
          name: "country",
          placeholder: "Country",
        },
        value: e.target.parentElement.elements["country"].value,
      },
      delivery: {
        elementType: "select",
        elementConfig: {
          options: [{ name: "standard", displayValue: "Standard" }, { name: "overnight", displayValue: "Overnight" }],
          label: "Delivery Method",
          name: "delivery",
        },
        value: e.target.parentElement.elements["delivery"].value,
      }
    };

    // this.setState({ orderForm: customer });
    this.submitOrder({
      customer: {
        name: customer.name.value,
        email: customer.email.value,
        street: customer.street.value,
        postal: customer.postal.value,
        country: customer.country.value
      },
      totalPrice: this.props.totalPrice,
      ingredients: this.props.ingredients,
      deliveryMethod: customer.delivery.value
    });
  };

  submitOrder = (order) => {
    // firebase endpoint, so use .json extension
    this.setState({ loading: true });

    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/", {});
      })
      .catch((error) => {
        this.setState({ loading: false });
        this.props.err(true, error.message);
      });
  };

  inputChangedHandler = (e) => {
    const newOrderForm = {...this.state.orderForm};
    newOrderForm[e.target.name].value = e.target.value;
    this.setState({newOrderForm});
  }

  render() {
    // console.log('ContactData props:', this.props)
    let formInputs = Object.values(this.state.orderForm).map(element => {
      return <Input key={element.elementConfig.name} elementType={element.elementType} elementConfig={element.elementConfig} changed={this.inputChangedHandler}/>
    });

    let output = (
      <div className={classes.ContactData}>
        <h4>Enter your contact info</h4>
        <form>
          {formInputs}
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
