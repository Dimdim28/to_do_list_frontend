import styles from "./Button.module.scss";

import React from "react";

interface Props {
  text: string;
  class: string;
  callback: any;
}

const Button: React.FC<Props> = ({ callback, text, class: nameOfClass }) => {
  return (
    <button
      className={`${styles.button} ${styles[nameOfClass]}`}
      onClick={() => callback()}
    >
      {text}
    </button>
  );
};

export default Button;
