import React, { SetStateAction } from "react";
import styles from "./Checkbox.module.scss";
interface CheckboxProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<SetStateAction<boolean>>;
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  setIsChecked,
  label,
}) => {
  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
      />
      <span className={styles.checkmark}></span>
      {label}
    </label>
  );
};
