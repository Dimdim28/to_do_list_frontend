import React from "react";
import styles from "./Input.module.scss";

interface InputProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}

interface FormikInputProps {
  name: string;
  type: string;
  title: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value: string | number | readonly string[] | undefined;
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <div className={styles.inputBox}>
      <input
        className={props.value ? styles.activeInput : styles.input}
        type={props.type}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      ></input>
      <span className={styles.span}>{props.title}</span>
      <i className={styles.i}></i>
    </div>
  );
};

export const FormikInput: React.FC<FormikInputProps> = (props) => {
  return (
    <div className={styles.inputBox}>
      <input
        className={props.value ? styles.activeInput : styles.input}
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
      <span className={styles.span}>{props.title}</span>
      <i className={styles.i}></i>
    </div>
  );
};
