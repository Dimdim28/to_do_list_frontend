import styles from "./Input.module.scss";

interface InputProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <div className={styles.inputBox}>
      <input
        className={props.value ? styles.activeInput : styles.input}
        type={props.type}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      ></input>
      <span className={styles.span}>{props.title}</span>
      <i className={styles.i}></i>
    </div>
  );
};
