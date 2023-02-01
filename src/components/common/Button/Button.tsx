import styles from "./Button.module.scss";

import React from "react";

interface Props {
  text: string;
  class: string;
  callback: any;
}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      className={`${styles.button} ${styles[props.class]}`}
      onClick={() => props.callback()}
    >
      {props.text}
    </button>
  );
};

export default Button;
