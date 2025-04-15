import { Dispatch, FC, InputHTMLAttributes, SetStateAction } from 'react';

import styles from './ProjectDescriptionTextArea.module.scss';

interface ProjectDescriptionTextAreaProps
  extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const ProjectDescriptionTextArea: FC<
  ProjectDescriptionTextAreaProps
> = ({ value, placeholder, setValue }) => {
  return (
    <div className={styles.inputBox}>
      <textarea
        value={value}
        className={value ? styles.activeInput : styles.input}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        rows={3}
      ></textarea>
    </div>
  );
};
