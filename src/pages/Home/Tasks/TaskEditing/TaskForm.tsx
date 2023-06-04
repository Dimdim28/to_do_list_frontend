import styles from "./TaskForm.module.scss";
import Button from "../../../../components/common/Button/Button";
import taskAPI, { Task, getTask } from "../../../../api/taskAPI";
import { useState } from "react";
import { useAppSelector } from "../../../../hooks";
import { selectProfile } from "../../../../redux/slices/auth/selectors";
import { Status } from "../../../../types";
import { Input } from "../../../../components/common/Input/Input";
import { Checkbox } from "../../../../components/common/Checkbox/Checkbox";
import Preloader from "../../../../components/Preloader/Preloader";
import Categories from "../../FiltersBar/Categories/Categories";

interface TaskFormProps {
  toggleActive: React.Dispatch<React.SetStateAction<boolean>>;
  childProps: Task & {
    fetchTasks: (params: getTask) => void;
    taskFetchingParams: getTask;
  };
}

const TaskForm: React.FC<TaskFormProps> = ({ toggleActive, childProps }) => {
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
    fetchTasks,
    taskFetchingParams,
  } = childProps;
  const [title, setTittle] = useState(prevTitle || "");
  const [description, setDescription] = useState(prevDescription || "");
  const [categories, setCategories] = useState(prevCategories || []);
  const [hasDeadline, setHasDeadline] = useState(!!prevDeadline);
  const [deadline, setDeadline] = useState(prevDeadline || "");
  const [isCompleted, setIsCompleted] = useState(prevIscompleted || false);

  const submit = async () => {
    setStatus(Status.LOADING);
    let payload = { title, description };
    if (hasDeadline && deadline) payload = Object.assign(payload, { deadline });
    if (categories.length > 0) payload = Object.assign(payload, { categories });
    if ([false, true].includes(isCompleted))
      payload = Object.assign(payload, { isCompleted });

    const result = _id
      ? await taskAPI.edittask({ _id, ...payload })
      : await taskAPI.addtask({ user: userId, ...payload });
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
          <Categories
            isForTask
            fetchTasks={fetchTasks}
            taskFetchingParams={taskFetchingParams}
            activeCategories={categories}
            setActiveCategories={setCategories}
          />
          <Input title="title" value={title} setValue={setTittle} type="text" />
          <Input
            title="description"
            value={description}
            setValue={setDescription}
            type="text"
          />
          <div className={styles.checkBox}>
            <Checkbox
              isChecked={hasDeadline}
              setIsChecked={setHasDeadline}
              label="Task has deadline"
            />
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
