import React, { useState } from "react";
import styles from "./Tasks.module.scss";
import TaskDeleting from "./TaskDeleting/TaskDeleting";
import { Modal } from "../../../components/common/Modal/Modal";

const Tasks = () => {
  // const [taskEditing, setTaskEditing] = useState(false);
  const [taskDeleting, setTaskDeleting] = useState(true);
  const [taskProps, setTaskProps] = useState({});

  return (
    <main className={styles.wrapper}>
      <Modal
        active={taskDeleting}
        setActive={setTaskDeleting}
        ChildComponent={TaskDeleting}
        childProps={taskProps}
      />
      tasks
    </main>
  );
};

export default Tasks;
