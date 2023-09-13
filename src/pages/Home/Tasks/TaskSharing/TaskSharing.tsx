import { useState, SetStateAction, Dispatch, FC } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Button from "../../../../components/common/Button/Button";
import Preloader from "../../../../components/Preloader/Preloader";
import { Input } from "../../../../components/common/Input/Input";
import taskAPI, { Task, getTask } from "../../../../api/taskAPI";
import { selectProfile } from "../../../../redux/slices/auth/selectors";
import { Status } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../../../hooks";

import { selectTheme } from "../../../../redux/slices/auth/selectors";
import { Theme } from "../../../../types";
import { changeTheme } from "../../../../redux/slices/auth/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

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
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const theme = useAppSelector(selectTheme);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    localStorage.setItem("theme", newTheme);
    dispatch(changeTheme(newTheme));
  };

  const changeLanguage = () => {
    const language = i18n.language;
    const getNewLanguage = () => {
      if (language === "en") return "ua";
      if (language === "ua") return "en";
      return "en";
    };
    const newLanguage = getNewLanguage();
    i18n.changeLanguage(newLanguage);
  };

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
       <div className={styles.actionsWrapper}>
        <FontAwesomeIcon
          icon={theme === Theme.DARK ? faSun : faMoon}
          className={styles.themeIcon}
          onClick={toggleTheme}
        />
        <button className={styles.language} onClick={changeLanguage}>
          {i18n.language}
        </button>
      </div>
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
