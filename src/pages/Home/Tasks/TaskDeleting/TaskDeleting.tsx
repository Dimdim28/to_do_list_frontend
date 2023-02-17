import styles from './TaskDeleting.module.scss';
import Button from '../../../../components/common/Button/Button';

interface TaskDeletingProps {
  toggleActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskDeleting: React.FC<TaskDeletingProps> = ({ toggleActive }) => {
  const submitHandler = () => {

  };

  const cancelHandler = () => {
    toggleActive(false)
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.actions}>
        <Button text='cancel' callback={() => {}} class='cancel' />
        <Button text='submit' callback={cancelHandler} class='submit' />
      </div>
    </div>
  )
};

export default TaskDeleting;