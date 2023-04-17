import React, { useState } from "react";
import styles from "./Tasks.module.scss";
import TaskDeleting from "./TaskDeleting/TaskDeleting";
import { Modal } from "../../../components/common/Modal/Modal";
import TaskEditing from "./TaskEditing/TaskForm";

const Tasks = () => {
  const [taskDeleting, setTaskDeleting] = useState(false);
  const [taskEditing, setTaskEditing] = useState(false);
  const [taskProps, setTaskProps] = useState({});

  return (
    <main className={styles.wrapper}>
      <div className={styles.line}>
        <span
          className={styles.createTask}
          onClick={() => {
            setTaskEditing(true);
            setTaskProps({});
          }}
        >
          Create task +
        </span>
      </div>
      <Modal
        active={taskDeleting}
        setActive={setTaskDeleting}
        ChildComponent={TaskDeleting}
        childProps={taskProps}
      />
      <Modal
        active={taskEditing}
        setActive={setTaskEditing}
        ChildComponent={TaskEditing}
        childProps={taskProps}
      />
      tasks
    </main>
  );
};

export default Tasks;
