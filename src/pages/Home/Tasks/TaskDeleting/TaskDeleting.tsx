import styles from "./TaskDeleting.module.scss";
import Button from "../../../../components/common/Button/Button";

interface TaskDeletingProps {
  toggleActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskDeleting: React.FC<TaskDeletingProps> = ({ toggleActive }) => {
  const submit = () => {};

  const cancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Do you really want to delete task</h3>
      <div className={styles.actions}>
        <Button text="cancel" callback={cancel} class="cancel" />
        <Button text="submit" callback={submit} class="submit" />
      </div>
    </div>
  );
};

export default TaskDeleting;
