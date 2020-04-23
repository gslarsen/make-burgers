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
      postalCode: {
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
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [{ name: "standard", displayValue: "Standard" }, { name: "overnight", displayValue: "Overnight" }],
          label: "Delivery Method",
          name: "delivery",
        },
        value: "",
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
        elementType: e.target.parentElement.elements["name"].localName,
        elementConfig: {
          type: e.target.parentElement.elements["name"].type,
          placeholder: e.target.parentElement.elements["name"].placeholder,
        },
        value: e.target.parentElement.elements["name"].value,
      },
      email: {
        elementType: e.target.parentElement.elements["email"].localName,
        elementConfig: {
          type: e.target.parentElement.elements["email"].type,
          placeholder: e.target.parentElement.elements["email"].placeholder,
        },
        value: e.target.parentElement.elements["email"].value,
      },
      street: {
        elementType: e.target.parentElement.elements["street"].localName,
        elementConfig: {
          type: e.target.parentElement.elements["street"].type,
          placeholder: e.target.parentElement.elements["street"].placeholder,
        },
        value: e.target.parentElement.elements["street"].value,
      },
      postalCode: {
        elementType: e.target.parentElement.elements["postal"].localName,
        elementConfig: {
          type: e.target.parentElement.elements["postal"].type,
          placeholder: e.target.parentElement.elements["postal"].placeholder,
        },
        value: e.target.parentElement.elements["postal"].value,
      },
      country: {
        elementType: e.target.parentElement.elements["country"].localName,
        elementConfig: {
          type: e.target.parentElement.elements["country"].type,
          placeholder: e.target.parentElement.elements["country"].placeholder,
        },
        value: e.target.parentElement.elements["country"].value,
      },
      deliveryMethod: {
        elementType: e.target.parentElement.elements["delivery"].localName,
        elementConfig: {
          options: [{ value: "standard", displayValue: "Standard" }, { value: "overnight", displayValue: "Overnight" }],
        },
        value: e.target.parentElement.elements["delivery"].value,
      }
    };

    this.setState({ orderForm: customer });
    this.submitOrder({
      customer: {
        name: customer.name.value,
        email: customer.email.value,
        street: customer.street.value,
        postal: customer.postalCode.value,
        country: customer.country.value
      },
      totalPrice: this.props.totalPrice,
      ingredients: this.props.ingredients,
      deliveryMethod: customer.deliveryMethod.value
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

  render() {
    // console.log('ContactData props:', this.props)
    let formInputs = Object.values(this.state.orderForm).map(element => {
      return <Input key={element.elementConfig.name} elementType={element.elementType} elementConfig={element.elementConfig}/>
    });

    let output = (
      <div className={classes.ContactData}>
        <h4>Enter your contact info</h4>
        <form>

          {/*<Input
            inputtype="input"
            label="Name"
            type="text"
            name="name"
            placeholder="Your Name"
          />
          <Input
            inputtype="input"
            label="email"
            type="email"
            name="email"
            placeholder="Your email"
          />
          <Input
            inputtype="input"
            label="Street"
            type="text"
            name="street"
            placeholder="Street"
          />
          <Input
            inputtype="input"
            label="Postal Code"
            type="text"
            name="postal"
            placeholder="Postal Code"
          />
          <Input
            inputtype="input"
            label="Country"
            type="text"
            name="country"
            placeholder="Country"
          />
          <Input inputtype="select" label="Delivery Method" name="delivery">
            <option name="standard">Standard</option>
            <option name="overnight">Overnight</option>
          </Input>*/}
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
