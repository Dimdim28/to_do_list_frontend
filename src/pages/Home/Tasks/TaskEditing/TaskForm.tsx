import styles from "./TaskForm.module.scss";
import Button from "../../../../components/common/Button/Button";
import taskAPI, { Task } from "../../../../api/taskAPI";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { selectProfile } from "../../../../redux/slices/auth/selectors";
import { Status } from "../../../../types";
import { Input } from "../../../../components/common/Input/Input";
import { Checkbox } from "../../../../components/common/Checkbox/Checkbox";
import Preloader from "../../../../components/Preloader/Preloader";

interface TaskFormProps {
  toggleActive: React.Dispatch<React.SetStateAction<boolean>>;
  childProps: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ toggleActive, childProps }) => {
  const dispatch = useAppDispatch();
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
    if (isCompleted) payload = Object.assign(payload, { isCompleted });

    console.log(payload);
    const result = _id
      ? await taskAPI.edittask({ _id, ...payload })
      : await taskAPI.addtask({ user: userId, ...payload });
    const { message, status } = result;
    setStatus(status);
    setTaskError(message || "");
    if (status === Status.SUCCESS) {
      toggleActive(false);
      // if (_id) {
      //   dispatch(updateCategoryInList({ _id, title, color }));
      // } else {
      //   dispatch(addCategoryToList(result.category));
      // }
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
              value={deadline}
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
            <Button text="submit" callback={submit} class="submit" />
          </div>
          {taskError && <p className={styles.error}>{taskError}</p>}
        </>
      )}
    </div>
  );
};

export default TaskForm;
