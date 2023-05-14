import React, { InputHTMLAttributes, SetStateAction } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
  setIsChecked: React.Dispatch<SetStateAction<boolean>>;
  label: string;
  isRounded?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  setIsChecked,
  label,
  isRounded
}) => {
  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
      />
      <span className={isRounded ? styles.roundedCheckMark : styles.checkmark}></span>
      {label}
    </label>
  );
};
