import React, { SetStateAction } from "react";
import styles from "./Checkbox.module.scss";
interface CheckboxProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<SetStateAction<boolean>>;
  label: string;
}

export const Checkbox = (props: CheckboxProps) => {
  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={props.isChecked}
        onChange={() => props.setIsChecked((prev) => !prev)}
      />
      <span className={styles.checkmark}></span>
      {props.label}
    </label>
  );
};
