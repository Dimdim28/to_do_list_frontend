import React, { useState } from "react";

import { Task, getTask } from "../../../../api/taskAPI";
import { selectCategories } from "../../../../redux/slices/home/selectors";
import { useAppSelector } from "../../../../hooks";
import { humaniseDate } from "../../../../helpers/string";
import { Checkbox } from "../../../../components/common/Checkbox/Checkbox";
import { Category } from "../../../../api/categoryAPI";

import styles from "./TaskCard.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

interface taskProps {
  task: Task;
  setTaskEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskProps: React.Dispatch<
    React.SetStateAction<
      | {}
      | (Task & {
          fetchTasks: (params: getTask) => void;
          fetchingParams: getTask;
        })
    >
  >;
  setTaskDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  fetchTasks: () => void;
  taskFetchingParams: getTask;
}

function getCategoryInfo(categories: Category[], id: string) {
  const category = categories.find((el) => el._id === id);
  const color = category?.color || "#FFFFFF";
  const name = category?.title || "";
  return [color, name];
}

const TaskCard = ({
  task,
  setTaskEditing,
  setTaskProps,
  setTaskDeleting,
  fetchTasks,
  taskFetchingParams,
}: taskProps) => {
  const { title, description, deadline, isCompleted, categories, _id } = task;

  const categoriesData = useAppSelector(selectCategories);

  const [completed, setIsCompleted] = useState(isCompleted || false);

  return (
    <div className={completed ? styles.completedWrapper : styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title} </h1>
        <Checkbox
          isForChangeCompletedStatus
          isChecked={completed}
          label=""
          setIsChecked={setIsCompleted}
          isRounded
          id={_id}
        />
      </div>
      <div className={styles.categoriesWrapper}>
        {categories?.map((el) => {
          const [color, name] = getCategoryInfo(categoriesData, el);
          return (
            <span
              key={el}
              style={{ borderColor: color }}
              className={styles.category}
            >
              {name}
            </span>
          );
        })}
      </div>
      <p className={styles.description}>{description}</p>
      {deadline && (
        <p className={styles.deadline}>Deadline: {humaniseDate(deadline)}</p>
      )}
      <div className={styles.icons}>
        <FontAwesomeIcon
          className={`${styles.icon} ${styles.pencil}`}
          onClick={() => {
            setTaskProps({ ...task, fetchTasks, taskFetchingParams });
            setTaskEditing(true);
          }}
          color="black"
          fontSize="15px"
          icon={faPencil}
        />
        <FontAwesomeIcon
          color="black"
          fontSize="15px"
          icon={faTrash}
          className={`${styles.icon} ${styles.trash}`}
          onClick={() => {
            setTaskProps({ ...task, fetchTasks, taskFetchingParams });
            setTaskDeleting(true);
          }}
        />
      </div>
    </div>
  );
};

export default TaskCard;
