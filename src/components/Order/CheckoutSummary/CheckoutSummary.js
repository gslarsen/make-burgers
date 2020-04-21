import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h2>We hope it tastes great!</h2>
      <div style={{ width: "100%", padding: "auto" }}>
        <Burger ingredients={props.ingredients} />
        <Button btnType="Danger" clicked={props.checkoutCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.checkoutContinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
