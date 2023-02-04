import styles from './Input.module.scss';

interface InputProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <>
      <span className={styles.span}>{props.title}</span>
      <input className={styles.input} type='text' value={props.value} onChange={() => props.setValue}></input>
      <i className={styles.i}></i>
    </>
  )
};

