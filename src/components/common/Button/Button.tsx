import {ComponentPropsWithoutRef,FC} from "react";

import styles from "./Button.module.scss";

interface Props extends ComponentPropsWithoutRef<"button"> {
  text: string;
  class: string;
  callback: any;
}

const Button: FC<Props> = ({
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
