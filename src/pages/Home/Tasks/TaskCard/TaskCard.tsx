import React, { useState } from "react";

import { Task, getTask } from "../../../../api/taskAPI";
import { humaniseDate } from "../../../../helpers/string";
import { Checkbox } from "../../../../components/common/Checkbox/Checkbox";

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
          taskFetchingParams: getTask;
        })
    >
  >;
  setTaskDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  fetchTasks: (params: getTask) => void;
  taskFetchingParams: getTask;
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

  const [completed, setIsCompleted] = useState(isCompleted || false);

  return (
    <div className={completed ? styles.completedWrapper : styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title} </h1>
        <Checkbox
          isForChangeCompletedStatus
          isChecked={completed}
          label=""
          data-testid="checkbox"
          setIsChecked={setIsCompleted}
          isRounded
          id={_id}
        />
      </div>
      <div className={styles.categoriesWrapper}>
        {categories?.map((el) => {
          const { color, title } = el;
          return (
            <span
              key={el._id}
              style={{ borderColor: color }}
              className={styles.category}
            >
              {title}
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
          data-testid="edit-icon"
          className={`${styles.icon} ${styles.pencil}`}
          onClick={(e) => {
            setTaskProps({ ...task, fetchTasks, taskFetchingParams });
            setTaskEditing(true);
            e.stopPropagation();
          }}
          color="black"
          fontSize="15px"
          icon={faPencil}
        />
        <FontAwesomeIcon
          color="black"
          data-testid="delete-icon"
          fontSize="15px"
          icon={faTrash}
          className={`${styles.icon} ${styles.trash}`}
          onClick={(e) => {
            setTaskProps({ ...task, fetchTasks, taskFetchingParams });
            setTaskDeleting(true);
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};

export default TaskCard;
