import { useState, SetStateAction, Dispatch, FC } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Button from "../../../../components/common/Button/Button";
import Preloader from "../../../../components/Preloader/Preloader";
import { Input } from "../../../../components/common/Input/Input";
import taskAPI, { Task, getTask } from "../../../../api/taskAPI";
import { selectProfile } from "../../../../redux/slices/auth/selectors";
import { Status } from "../../../../types";

import styles from "./TaskSharing.module.scss";
import { truncate } from "../../../../helpers/string";

interface TaskSharingProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: Task & {
    fetchTasks: (params: getTask) => void;
    taskFetchingParams: getTask;
  };
}

const TaskSharing: FC<TaskSharingProps> = ({ childProps, toggleActive }) => {
  const { _id, title, fetchTasks, taskFetchingParams } = childProps;

  const [status, setStatus] = useState(Status.SUCCESS);
  const [taskError, setTaskError] = useState("");
  const [userId, setUserId] = useState("");

  const profile = useSelector(selectProfile);
  const { t } = useTranslation();

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
          {t("enterID")}{" "}
            <p className={styles.name}>{truncate(title, 12)}</p>
          </h3>
          <Input
            title={t("userID")}
            type="text"
            value={userId}
            setValue={setUserId}
          />
          <div className={styles.actions}>
            <Button text={t("cancel")} callback={cancel} class="cancel" />
            <Button text={t("submit")} callback={submit} class="submit" />
          </div>
          {taskError && <p className={styles.error}>{taskError}</p>}
        </>
      )}
    </div>
  );
};

export default TaskSharing;
