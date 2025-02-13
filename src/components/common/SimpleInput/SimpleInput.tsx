import { Dispatch, FC, InputHTMLAttributes, SetStateAction } from 'react';

import styles from './SimpleInput.module.scss';

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  type: string;
}

export const SimpleInput: FC<SimpleInputProps> = ({
  value,
  type,
  setValue,
  placeholder,
}) => {
  return (
    <div className={styles.inputBox}>
      <input
        className={value ? styles.activeInput : styles.input}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};
