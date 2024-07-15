import { Dispatch, FC,InputHTMLAttributes, SetStateAction,   } from "react";

import styles from "./TextArea.module.scss";

interface TextAreaProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const TextArea: FC<TextAreaProps> = ({
  value,
  title,
  setValue,
}) => {
  return (
    <div className={styles.inputBox}>
      <textarea
        className={value ? styles.activeInput : styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <span className={styles.span}>{title}</span>
      <i className={styles.i}></i>
    </div>
  );
};
