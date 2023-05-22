import styles from "./Button.module.scss";

import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  text: string;
  class: string;
  callback: any;
}

const Button: React.FC<Props> = ({
  callback,
  text,
  class: nameOfClass,
  ...rest
}) => {
  return (
    <button
      className={`${styles.button} ${styles[nameOfClass]}`}
      onClick={() => callback()}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
