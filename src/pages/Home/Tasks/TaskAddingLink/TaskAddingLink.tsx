import { useState, Dispatch, SetStateAction, FC } from "react";

import Button from "../../../../components/common/Button/Button";
import Preloader from "../../../../components/Preloader/Preloader";
import { Input } from "../../../../components/common/Input/Input";
import taskAPI, { Task, getTask } from "../../../../api/taskAPI";
import { Status } from "../../../../types";
import { truncate } from "../../../../helpers/string";

import styles from "./TaskAddingLink.module.scss";

interface TaskAddingLinkProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: Task & {
    fetchTasks: (params: getTask) => void;
    taskFetchingParams: getTask;
  };
}

const TaskAddingLink: FC<TaskAddingLinkProps> = ({
  childProps,
  toggleActive,
}) => {
  const { _id, title, links, fetchTasks, taskFetchingParams } = childProps;

  const [status, setStatus] = useState(Status.SUCCESS);
  const [taskError, setTaskError] = useState("");
  const [url, setUrl] = useState("");

  const submit = async () => {
    setStatus(Status.LOADING);
    const result = await taskAPI.addLinkToTask(_id, links || [], url);
    const { message, status } = result;
    setStatus(status);
    setTaskError(message || "");
    if (status === Status.SUCCESS) {
      toggleActive(false);
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
            Enter link you want to attach to{" "}
            <p className={styles.name}>{truncate(title, 12)}</p> {" task"}
          </h3>
          <Input title="url" type="text" value={url} setValue={setUrl} />
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

export default TaskAddingLink;
