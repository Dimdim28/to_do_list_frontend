import React, { useState } from "react";
import { Task } from "../../../../api/taskAPI";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import { humaniseDate } from "../../../../helpers/string";
import { Checkbox } from "../../../../components/common/Checkbox/Checkbox";

import styles from "./TaskCard.module.scss";

interface taskProps {
  task: Task;
}

const TaskCard = ({ task }: taskProps) => {
  const { title, description, deadline, isCompleted } = task;
  const [completed, setIsCompleted] = useState(isCompleted || false);
  return (
    <div className={completed ? styles.completedWrapper : styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title} </h1>
        <Checkbox
          isChecked={completed}
          label=""
          setIsChecked={setIsCompleted}
          isRounded
        />
      </div>

      <p className={styles.description}>{description}</p>
      {deadline && (
        <p className={styles.deadline}>Deadline: {humaniseDate(deadline)}</p>
      )}
      <div className={styles.icons}>
        <FontAwesomeIcon
          className={`${styles.icon} ${styles.pencil}`}
          onClick={() => {
            // setCategoryInfo(props);
            // setCategoryEditing(true);
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
            // setCategoryInfo(props);
            // setCategoryDeleting(true);
          }}
        />
      </div>
    </div>
  );
};

export default TaskCard;
