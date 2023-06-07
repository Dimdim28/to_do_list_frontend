import React from "react";

import styles from "./TaskSharing.module.scss";
import Button from "../../../../components/common/Button/Button";
import taskAPI, { Task, getTask } from "../../../../api/taskAPI";
import { useState } from "react";
import { Status } from "../../../../types";
import Preloader from "../../../../components/Preloader/Preloader";
import { Input } from "../../../../components/common/Input/Input";
import { useSelector } from "react-redux";
import { selectProfile } from "../../../../redux/slices/auth/selectors";

interface TaskSharingProps {
  toggleActive: React.Dispatch<React.SetStateAction<boolean>>;
  childProps: Task & {
    fetchTasks: (params: getTask) => void;
    taskFetchingParams: getTask;
  };
}

const TaskSharing: React.FC<TaskSharingProps> = ({
  childProps,
  toggleActive,
}) => {
  const { _id, title, fetchTasks, taskFetchingParams } = childProps;

  const [status, setStatus] = useState(Status.SUCCESS);
  const [taskError, setTaskError] = useState("");
  const [userId, setUserId] = useState("");

  const profile = useSelector(selectProfile);
  const submit = async () => {
    setStatus(Status.LOADING);
    const result = await taskAPI.shareTask(
      _id,
      profile?.username || "inkognito",
      userId
    );
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
            Enter user Id to share with him{" "}
            <p className={styles.name}>{title}</p> {" task"}
          </h3>
          <Input
            title="user ID"
            type="text"
            value={userId}
            setValue={setUserId}
          />
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

export default TaskSharing;