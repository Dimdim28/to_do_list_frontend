import {
  Dispatch,
  FC,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';

import styles from './TaskDescriptionTextArea.module.scss';

interface TaskDescriptionTextAreaProps
  extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  currentTaskId: string;
}

export const TaskDescriptionTextArea: FC<TaskDescriptionTextAreaProps> = ({
  value,
  placeholder,
  setValue,
  currentTaskId,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = (target: HTMLTextAreaElement) => {
    target.style.height = '0px';
    target.style.height = `${target.scrollHeight}px`;
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      textareaRef.current.style.height = `25px`;
    }
  }, [currentTaskId]);

  useEffect(() => {
    if (value.length === 0 && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      textareaRef.current.style.height = `25px`;
    }
  }, [value]);

  return (
    <div className={styles.inputBox}>
      <textarea
        value={value}
        ref={textareaRef}
        className={value ? styles.activeInput : styles.input}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);

          adjustHeight(e.target as HTMLTextAreaElement);
        }}
        onClick={(e) => adjustHeight(e.target as HTMLTextAreaElement)}
        onMouseEnter={(e) => adjustHeight(e.target as HTMLTextAreaElement)}
        rows={1}
      ></textarea>
    </div>
  );
};
