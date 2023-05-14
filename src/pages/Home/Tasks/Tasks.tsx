import React, { useEffect, useState } from "react";
import taskAPI, { Task, getTask } from "../../../api/taskAPI";

import styles from "./Tasks.module.scss";
import TaskDeleting from "./TaskDeleting/TaskDeleting";
import { Modal } from "../../../components/common/Modal/Modal";
import TaskEditing from "./TaskEditing/TaskForm";
import TaskCard from "./TaskCard/TaskCard";
import Pagination from "./Pagination/Pagination";
import Preloader from "../../../components/Preloader/Preloader";
const Tasks = () => {
  const [taskDeleting, setTaskDeleting] = useState(false);
  const [taskEditing, setTaskEditing] = useState(false);
  const [taskProps, setTaskProps] = useState({});
  const [Tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchTasks(params?: getTask) {
    setIsLoading(true);
    setError("");
    const result = await taskAPI.getTasks(params);
    const { message, tasks, totalPages: fetchedTotalPages } = result;
    if (message) {
      setError(message);
    } else {
      setTasks(tasks);
      setTotalPages(fetchedTotalPages || totalPages);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchTasks({ page: currentPage });
  }, [currentPage]);

  return (
    <main
      className={Tasks.length > 0 ? styles.wrapperWithTasks : styles.wrapper}
    >
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
      {isLoading ? (
        <Preloader />
      ) : (
        <div className={styles.tasksWrapper}>
          {error ? (
            <div>{error}</div>
          ) : (
            <div className={styles.tasks}>
              {Tasks.map((el) => (
                <TaskCard task={el} key={el._id} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <Pagination
                currentPage={currentPage}
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
