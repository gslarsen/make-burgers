import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  // this state is a template to enable form creation and holds the 'value' for each item in the order form,
  // updated on changes, and the value for loading, which is changed upon order submission

  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Name",
          name: "name",
          placeholder: "Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          label: "Email",
          name: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
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
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
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
        validation: {
          required: true,
          minLength: 5,
          maxLength: 7,
        },
        valid: false,
        touched: false,
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
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      delivery: {
        elementType: "select",
        elementConfig: {
          options: [
            { name: "standard", displayValue: "Standard" },
            { name: "overnight", displayValue: "Overnight" },
          ],
          label: "Delivery Method",
          name: "delivery",
        },
        value: "Standard",
      },
    },
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.error !== this.props.error) {
      this.props.err(true, this.props.errorMsg);
    }
  }

  orderHandler = (e) => {
    e.preventDefault();
    const orderFormEntryValidity = Object.values(this.state.orderForm).map(
      (element) => {
        return [element.elementConfig.name, element.valid];
      }
    );

    const invalidOrderFormEntries = orderFormEntryValidity.filter(
      (element) => element[1] === false
    );

    if (invalidOrderFormEntries.length > 0) return;
    else
      this.props.submitOrder(
        {
          customer: {
            userId: this.props.userId,
            name: this.state.orderForm.name.value,
            email: this.state.orderForm.email.value,
            street: this.state.orderForm.street.value,
            postal: this.state.orderForm.postal.value,
            country: this.state.orderForm.country.value,
          },
          totalPrice: this.props.totalPrice,
          ingredients: this.props.ingredients,
          deliveryMethod: this.state.orderForm.delivery.value,
        },
        this.props
      );
  };

  inputChangedHandler = (e) => {
    //note this is not a deep clone -> see the state.orderForm[e.target.name].elementConfig, but we're only setting state on the value property here.
    const orderForm = { ...this.state.orderForm };
    orderForm[e.target.name].value = e.target.value;
    orderForm[e.target.name].touched = true;

    if (e.target.name !== "delivery") {
      const isValid = this.checkValidity(
        e.target.value,
        orderForm[e.target.name].validation
      );
      orderForm[e.target.name].valid = isValid;
    }
    this.setState({ orderForm });
  };

  checkValidity = (value, rules) => {
    if (rules.required) {
      if (value.trim() === "") return false;
    }

    if (rules.minLength) {
      if (value.length < rules.minLength) return false;
    }

    return true;
  };

  render() {
    const invalidOrderFormEntries = Object.values(this.state.orderForm)
      .map((element) => {
        return [element.elementConfig.name, element.valid];
      })
      .filter((element) => element[1] === false);

    let buttonType = "Success";
    let buttonDisabled = invalidOrderFormEntries.length === 0 ? false : true;
    if (buttonDisabled) buttonType = "Disabled";

    let formInputs = Object.values(this.state.orderForm).map((element) => {
      return (
        <Input
          key={element.elementConfig.name}
          elementType={element.elementType}
          elementConfig={element.elementConfig}
          validation={element.validation}
          changed={this.inputChangedHandler}
          invalid={!element.valid}
          touched={element.touched}
        />
      );
    });

    let output = (
      <div className={classes.ContactData}>
        <h4>Enter your contact info</h4>
        <form onSubmit={this.orderHandler}>
          {formInputs}
          <Button
            btnType={buttonType}
            clicked={() => {}}
            disabled={buttonDisabled}
          >
            ORDER
          </Button>
        </form>
      </div>
    );

    if (this.props.error) {
      if (this.props.errorMsg.includes("401")) output = (
        <div style={{ textAlign: "center" }}>
          <p>
            Apologies! {this.props.errorMsg}
          </p>
          <p>
            Please login and try again - your order is still there!
          </p>
        </div>
      ) 
      else output = (
        <div style={{ textAlign: "center" }}>
          <p>
            Apologies! There was a {this.props.errorMsg} error submitting the
            order.
          </p>
          <p>
            Please select 'CANCEL' and try again - your order is still there!
          </p>
        </div>
      );
    }

    if (this.props.loading) output = <Spinner />;
    return output;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    error: state.order.error,
    errorMsg: state.order.errorMsg,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitOrder: (order, props) =>
      dispatch(actions.purchaseBurger(order, props)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData));
