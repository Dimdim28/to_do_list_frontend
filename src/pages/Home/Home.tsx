import React, { useEffect, useState } from "react";
import withLoginRedirect from "../../hoc/withLoginRedirect";
import { useAppDispatch } from "../../hooks";

import { clearCategories } from "../../redux/slices/home/home";
import { fetchCategories } from "../../redux/slices/home/thunk";
import Filters from "./FiltersBar/FiltersBar";
import styles from "./Home.module.scss";
import Tasks from "./Tasks/Tasks";
import { IsCompleted, Date } from "./FiltersBar/Filters/Filters";
import taskAPI, { Category, Task, getTask } from "../../api/taskAPI";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<Date>("all");
  const [isCompleted, setIsCompleted] = useState<IsCompleted>("all");
  const [categories, setCategories] = useState<Category[]>([]);

  const [TasksArray, setTasks] = useState<Task[]>([]);
  const [totalTaskPages, setTotalTaskPages] = useState(2);
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState("");

  const fetchingParams: getTask = { page: currentPage };
  if (isCompleted !== "all") {
    if (isCompleted === "false") {
      fetchingParams.isCompleted = false;
    } else {
      fetchingParams.isCompleted = true;
    }
  }
  useEffect(() => {
    dispatch(fetchCategories(fetchingParams));
    return () => {
      dispatch(clearCategories());
    };
  }, [dispatch]);

  async function fetchTasks(params?: getTask) {
    setIsTasksLoading(true);
    setTasksError("");
    const result = await taskAPI.getTasks(params);
    if (!result) {
      setTasksError("Could not fetch tasks");
      return;
    }
    const { message, tasks, totalPages: fetchedTotalPages } = result;
    if (message) {
      setTasksError(message);
    } else {
      setTasks(tasks);
      setTotalTaskPages(fetchedTotalPages || totalTaskPages);
      setIsTasksLoading(false);
    }
  }

  return (
    <div className={styles.row}>
      <Filters
        date={date}
        setDate={setDate}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
        categories={categories}
        setCategories={setCategories}
        fetchTasks={fetchTasks}
        taskFetchingParams={fetchingParams}
      />
      <Tasks
        Tasks={TasksArray}
        totalPages={totalTaskPages}
        isLoading={isTasksLoading}
        error={tasksError}
        fetchTasks={fetchTasks}
        taskFetchingParams={fetchingParams}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default withLoginRedirect(Home);
