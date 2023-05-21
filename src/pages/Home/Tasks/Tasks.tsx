import React, { useEffect, useState } from "react";
import { Task, getTask } from "../../../api/taskAPI";

import styles from "./Tasks.module.scss";
import TaskDeleting from "./TaskDeleting/TaskDeleting";
import { Modal } from "../../../components/common/Modal/Modal";
import TaskEditing from "./TaskEditing/TaskForm";
import TaskCard from "./TaskCard/TaskCard";
import Pagination from "./Pagination/Pagination";
import Preloader from "../../../components/Preloader/Preloader";

interface TaskProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  taskFetchingParams: getTask;
  fetchTasks: (params: getTask) => void;
  isLoading: boolean;
  error: string;
  Tasks: Task[];
  totalPages: number;
}

const Tasks: React.FC<TaskProps> = ({
  setCurrentPage,
  taskFetchingParams,
  fetchTasks,
  isLoading,
  error,
  Tasks,
  totalPages,
}) => {
  const { page, isCompleted, deadline } = taskFetchingParams;
  const [taskDeleting, setTaskDeleting] = useState(false);
  const [taskEditing, setTaskEditing] = useState(false);
  const [taskProps, setTaskProps] = useState<Task | {}>({});

  useEffect(() => {
    fetchTasks(taskFetchingParams);
  }, [page, isCompleted, deadline]);

  return (
    <main
      className={
        Tasks && Tasks.length > 0 ? styles.wrapperWithTasks : styles.wrapper
      }
    >
      <div className={styles.line}>
        <span
          className={styles.createTask}
          onClick={() => {
            setTaskEditing(true);
            setTaskProps({
              fetchTasks,
              taskFetchingParams,
            });
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
      {isLoading ? (
        <Preloader />
      ) : (
        <div className={styles.tasksWrapper}>
          {error ? (
            <div className={styles.errorMessage}>{error}</div>
          ) : (
            <div className={styles.tasks}>
              {Tasks && Tasks.length > 0 ? (
                Tasks.map((el) => (
                  <TaskCard
                    setTaskEditing={setTaskEditing}
                    setTaskProps={setTaskProps}
                    setTaskDeleting={setTaskDeleting}
                    task={el}
                    key={el._id}
                    fetchTasks={fetchTasks}
                    taskFetchingParams={taskFetchingParams}
                  />
                ))
              ) : (
                <p className={styles.noTasks}>You have no tasks</p>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <Pagination
                currentPage={page || 1}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Tasks;
