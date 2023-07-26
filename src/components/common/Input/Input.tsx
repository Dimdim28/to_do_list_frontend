import React, { InputHTMLAttributes, useState } from "react";

import styles from "./Input.module.scss";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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

export const Input: React.FC<InputProps> = ({
  value,
  type,
  title,
  setValue,
}) => {
  return (
    <div className={styles.inputBox}>
      <input
        className={value ? styles.activeInput : styles.input}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <span className={styles.span}>{title}</span>
      <i className={styles.i}></i>
    </div>
  );
};

export const FormikInput: React.FC<FormikInputProps> = ({
  type,
  value,
  name,
  onChange,
  onBlur,
  title,
}) => {
  const [activeType, setActiveType] = useState(type);

  return (
    <div className={styles.inputBox}>
      <input
        className={value ? styles.activeInput : styles.input}
        name={name}
        type={activeType}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        autoComplete="on"
      />
      <span className={styles.span}>{title}</span>
      <i className={styles.i}></i>
      {type === "password" && (
        <>
          {activeType === "password" && (
            <FontAwesomeIcon
              data-testid="eye-icon"
              className={styles.show}
              icon={faEye}
              onClick={() => setActiveType("text")}
            />
          )}
          {activeType === "text" && (
            <FontAwesomeIcon
              data-testid="eye-icon"
              className={styles.hide}
              icon={faEyeSlash}
              onClick={() => setActiveType("password")}
            />
          )}
        </>
      )}
    </div>
  );
};
