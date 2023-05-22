import styles from "./TaskDeleting.module.scss";
import Button from "../../../../components/common/Button/Button";
import taskAPI, { Task, getTask } from "../../../../api/taskAPI";
import { useState } from "react";
import { Status } from "../../../../types";
import Preloader from "../../../../components/Preloader/Preloader";

interface TaskDeletingProps {
  toggleActive: React.Dispatch<React.SetStateAction<boolean>>;
  childProps: Task & {
    fetchTasks: (params: getTask) => void;
    taskFetchingParams: getTask;
  };
}

const TaskDeleting: React.FC<TaskDeletingProps> = ({
  childProps,
  toggleActive,
}) => {
  const { _id, title, fetchTasks, taskFetchingParams } = childProps;

  const [status, setStatus] = useState(Status.SUCCESS);
  const [taskError, setTaskError] = useState("");

  const submit = async () => {
    setStatus(Status.LOADING);
    const result = await taskAPI.deleteTask(_id);
    const { message, status } = result;
    setStatus(status);
    setTaskError(message || "");
    if (status === Status.SUCCESS) {
      toggleActive(false);
      console.log(taskFetchingParams);
      fetchTasks(taskFetchingParams);
    }
  };

  const cancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      {status === Status.LOADING ? (
        <Preloader />
      ) : (
        <>
          <h3 className={styles.title}>
            Do you really want to delete task {title}
          </h3>
          <div className={styles.actions}>
            <Button text="cancel" callback={cancel} class="cancel" />
            <Button text="submit" callback={submit} class="submit" />
          </div>
          {taskError && <p className={styles.error}>{taskError}</p>}
        </>
      )}
    </div>
  );
};

export default TaskDeleting;
