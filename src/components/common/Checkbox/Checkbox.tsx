import { FC, InputHTMLAttributes } from 'react';

import styles from './Checkbox.module.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
  label: string;
  isRounded?: boolean;
  callback?: () => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  isChecked,
  label,
  isRounded,
  callback,
}) => {
  return (
    <label
      className={styles.checkboxContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <input type="checkbox" checked={isChecked} onChange={callback} />
      <span
        data-testid="checkbox-span"
        className={isRounded ? styles.roundedCheckMark : styles.checkmark}
      ></span>
      {label}
    </label>
  );
};
