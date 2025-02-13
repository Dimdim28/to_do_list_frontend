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
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);

    requestAnimationFrame(() => {
      e.target.style.height = 'auto'; // Сброс высоты перед пересчетом
      //e.target.style.height = `${Math.min(e.target.scrollHeight, 400)}px`;
      e.target.style.height = `${e.target.scrollHeight}px`;
    });
  };
  return (
    <div className={styles.inputBox}>
      <textarea
        className={value ? styles.activeInput : styles.input}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};
