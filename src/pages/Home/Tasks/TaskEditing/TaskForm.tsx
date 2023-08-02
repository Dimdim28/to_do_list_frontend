import { useState, Dispatch, SetStateAction, FC } from "react";

import Button from "../../../../components/common/Button/Button";
import Preloader from "../../../../components/Preloader/Preloader";
import Categories from "../../FiltersBar/Categories/Categories";
import { Input } from "../../../../components/common/Input/Input";
import { Checkbox } from "../../../../components/common/Checkbox/Checkbox";
import { TextArea } from "../../../../components/common/TextArea/TextArea";
import { useAppSelector } from "../../../../hooks";
import { selectProfile } from "../../../../redux/slices/auth/selectors";
import { Status } from "../../../../types";
import taskAPI, { Task, getTask } from "../../../../api/taskAPI";

import styles from "./TaskForm.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface TaskFormProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: Task & {
    fetchTasks: (params: getTask) => void;
    taskFetchingParams: getTask;
    length: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
  };
}

const TaskForm: FC<TaskFormProps> = ({ toggleActive, childProps }) => {
  const userId = useAppSelector(selectProfile)?._id || "";
  const [status, setStatus] = useState(Status.SUCCESS);
  const [taskError, setTaskError] = useState("");
  const {
    _id,
    title: prevTitle,
    description: prevDescription,
    categories: prevCategories,
    deadline: prevDeadline,
    isCompleted: prevIscompleted,
    links: prevLinks,
    fetchTasks,
    taskFetchingParams,
    length,
    setCurrentPage,
  } = childProps;
  const [title, setTittle] = useState(prevTitle || "");
  const [description, setDescription] = useState(prevDescription || "");
  const [categories, setCategories] = useState(
    prevCategories?.map((el) => el._id) || []
  );
  const [hasDeadline, setHasDeadline] = useState(!!prevDeadline);
  const [deadline, setDeadline] = useState(prevDeadline || "");
  const [isCompleted, setIsCompleted] = useState(prevIscompleted || false);
  const [links, setLinks] = useState([...(prevLinks || [])]);

  const submit = async () => {
    setStatus(Status.LOADING);
    let payload = { title, description, links: links || [] };
    if (hasDeadline && deadline) payload = Object.assign(payload, { deadline });
    if (categories.length > 0)
      payload = Object.assign(payload, {
        categories,
      });
    if ([false, true].includes(isCompleted))
      payload = Object.assign(payload, { isCompleted });

    const result = _id
      ? await taskAPI.edittask({ _id, ...payload })
      : await taskAPI.addtask({ user: userId, ...payload });
    const { message, status } = result;
    setStatus(status);
    setTaskError(message || "");
    if (status === Status.SUCCESS) {
      if (!_id && length === 10) {
        setCurrentPage((prev) => {
          const params = { ...taskFetchingParams, page: prev + 1 };
          fetchTasks(params);
          return prev + 1;
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
          <Categories
            isForTask
            fetchTasks={fetchTasks}
            taskFetchingParams={taskFetchingParams}
            activeCategories={categories}
            setActiveCategories={setCategories}
          />
          <Input title="title" value={title} setValue={setTittle} type="text" />
          <TextArea
            title="description"
            value={description}
            setValue={setDescription}
          />
          <div className={styles.checkBox}>
            <Checkbox
              isChecked={hasDeadline}
              setIsChecked={setHasDeadline}
              label="Task has deadline"
            />
            {links.map((link, index) => (
              <div className={styles.linkRow}>
                <Input
                  key={index}
                  title="link"
                  value={link}
                  setValue={(newLink: any) => {
                    setLinks((prev) =>
                      prev.map((el, id) => (id === index ? newLink : el))
                    );
                  }}
                  type="text"
                />
                <FontAwesomeIcon
                  fontSize="15px"
                  icon={faX}
                  className={styles.removeLink}
                  onClick={() => {
                    setLinks((prev) => prev.filter((el, id) => id !== index));
                  }}
                />
              </div>
            ))}
          </div>
          {hasDeadline && (
            <input
              type="date"
              className={styles.inputDate}
              value={deadline.slice(0, 10)}
              onChange={(e) => setDeadline(e.target.value)}
            />
          )}
          <div className={styles.checkBox}>
            <Checkbox
              isChecked={isCompleted}
              setIsChecked={setIsCompleted}
              label="Task completed"
            />
          </div>

          <div className={styles.actions}>
            <Button text="cancel" callback={cancel} class="cancel" />
            <Button
              text="submit"
              callback={submit}
              class="submit"
              disabled={description.length < 3 || title.length < 3}
            />
          </div>
          {taskError && <p className={styles.error}>{taskError}</p>}
        </>
      )}
    </div>
  );
};

export default TaskForm;
