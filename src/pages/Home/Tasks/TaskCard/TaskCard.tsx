import React, { useState } from "react";
import { Task } from "../../../../api/taskAPI";

import styles from "./TaskCard.module.scss";
import { humaniseDate } from "../../../../helpers/string";
import { Checkbox } from "../../../../components/common/Checkbox/Checkbox";

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
    </div>
  );
};

export default TaskCard;
