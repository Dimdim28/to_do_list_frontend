import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
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
      />
      <span className={styles.span}>{props.title}</span>
      <i className={styles.i}></i>
    </div>
  );
};

export const FormikInput: React.FC<FormikInputProps> = (props) => {
  const [type, setType] = useState(props.type);

  return (
    <div className={styles.inputBox}>
      <input
        className={props.value ? styles.activeInput : styles.input}
        name={props.name}
        type={type}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        autoComplete="on"
      />
      <span className={styles.span}>{props.title}</span>
      <i className={styles.i}></i>
      {props.type === "password" && (
        <>
          {type === "password" && (
            <FontAwesomeIcon
              className={styles.show}
              icon={faEye}
              onClick={() => setType("text")}
            />
          )}
          {type === "text" && (
            <FontAwesomeIcon
              className={styles.hide}
              icon={faEyeSlash}
              onClick={() => setType("password")}
            />
          )}
        </>
      )}
    </div>
  );
};
