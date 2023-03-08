import React, { useState } from "react";
import styles from "./Tasks.module.scss";
import TaskDeleting from "./TaskDeleting/TaskDeleting";
import { Modal } from "../../../components/common/Modal/Modal";

const Tasks = () => {
  const [taskDeleting, setTaskDeleting] = useState(false);
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
