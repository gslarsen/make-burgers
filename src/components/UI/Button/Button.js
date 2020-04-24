import React from 'react';

import classes from './Button.module.css';

const Button = (props) => (
  <button className={[classes.Button, classes[props.btnType]].join(' ')} onClick={(e, btnType) => props.clicked(e, props.btnType)} disabled={props.disabled}>{props.children}</button>
);

export default Button;