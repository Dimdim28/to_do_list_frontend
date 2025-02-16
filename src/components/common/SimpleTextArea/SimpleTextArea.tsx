import { Dispatch, FC, InputHTMLAttributes, SetStateAction } from 'react';

import styles from './SimpleTextArea.module.scss';

interface SimpleTextAreaProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const SimpleTextArea: FC<SimpleTextAreaProps> = ({
  value,
  placeholder,
  setValue,
}) => {
  return (
    <div className={styles.inputBox}>
      <div
        className={value ? styles.activeInput : styles.input}
        contentEditable
        role="textbox"
        aria-placeholder={placeholder}
        onInput={(e) => setValue(e.currentTarget.textContent || '')}
      >
        {value}
      </div>
    </div>
  );
};
