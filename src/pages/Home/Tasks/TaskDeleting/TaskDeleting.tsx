import { useState } from "react";

import Preloader from "../../../../components/Preloader/Preloader";
import Button from "../../../../components/common/Button/Button";
import taskAPI, { Task, getTask } from "../../../../api/taskAPI";
import { truncate } from "../../../../helpers/string";
import { Status } from "../../../../types";

import styles from "./TaskDeleting.module.scss";

interface TaskDeletingProps {
  toggleActive: React.Dispatch<React.SetStateAction<boolean>>;
  childProps: Task & {
    fetchTasks: (params: getTask) => void;
    taskFetchingParams: getTask;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    length: number;
  };
}

const TaskDeleting: React.FC<TaskDeletingProps> = ({
  childProps,
  toggleActive,
}) => {
  const { _id, title, fetchTasks, taskFetchingParams, setCurrentPage, length } =
    childProps;

  const [status, setStatus] = useState(Status.SUCCESS);
  const [taskError, setTaskError] = useState("");

  const submit = async () => {
    setStatus(Status.LOADING);
    const result = await taskAPI.deleteTask(_id);
    const { message, status } = result;
    setStatus(status);
    setTaskError(message || "");
    if (status === Status.SUCCESS) {
      if (length === 1) {
        setCurrentPage((prev) => {
          const params = { ...taskFetchingParams, page: prev - 1 };
          fetchTasks(params);
          return prev - 1;
        });
      } else {
        fetchTasks(taskFetchingParams);
      }
      toggleActive(false);
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
          <div className={styles.modalContent}>
            <p>Do you really want to delete task:</p>
             <h3>{truncate(title,12)}</h3> 
          </div>
          <div className={styles.actions}>
            <Button text="cancel" callback={cancel} class="cancel" />
            <Button
              text="submit"
              callback={submit}
              class="submit"
              data-testid="submit-button"
            />
          </div>
          {taskError && <p className={styles.error}>{taskError}</p>}
        </>
      )}
    </div>
  );
};

export default TaskDeleting;
