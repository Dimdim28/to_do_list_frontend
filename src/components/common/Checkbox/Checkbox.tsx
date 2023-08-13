import { InputHTMLAttributes, SetStateAction, Dispatch, FC } from "react";

import taskAPI from "../../../api/taskAPI";

import styles from "./Checkbox.module.scss";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  label: string;
  isRounded?: boolean;
  isForChangeCompletedStatus?: boolean;
  id?: string;
}

export const Checkbox: FC<CheckboxProps> = ({
  isChecked,
  setIsChecked,
  label,
  isRounded,
  isForChangeCompletedStatus,
  id,
}) => {
  return (
    <label
      className={styles.checkboxContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          if (isForChangeCompletedStatus) {
            const toggle = async () => {
              try {
                const result = await taskAPI.edittask({
                  _id: id || "",
                  isCompleted: !isChecked,
                });
                if (result.status === "success") setIsChecked((prev) => !prev);
              } catch (e) {
                console.log(e);
              }
            };
            toggle();
          }
          if (!isForChangeCompletedStatus) setIsChecked((prev) => !prev);
        }}
      />
      <span
        data-testid="checkbox-span"
        className={isRounded ? styles.roundedCheckMark : styles.checkmark}
      ></span>
      {label}
    </label>
  );
};
