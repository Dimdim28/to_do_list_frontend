import React, { useState } from "react";
import { Task } from "../../../api/taskAPI";

import styles from "./Tasks.module.scss";
import TaskDeleting from "./TaskDeleting/TaskDeleting";
import { Modal } from "../../../components/common/Modal/Modal";
import TaskEditing from "./TaskEditing/TaskForm";
import TaskCard from "./TaskCard/TaskCard";
import Pagination from "./Pagination/Pagination";

const Tasks = () => {
  const [taskDeleting, setTaskDeleting] = useState(false);
  const [taskEditing, setTaskEditing] = useState(false);
  const [taskProps, setTaskProps] = useState({});
  const [Tasks, setTasks] = useState<Task[]>([
    {
      _id: "643d553cd1c6dd3e2ebe6e37",
      title: "tu tu ru tu tu tu",
      description: "I told you long ago, on the road...",
      categories: [],
      isCompleted: false,
      deadline: null,
      user: "63f6342acc86923016194255",
      createdAt: "2023-04-17T14:18:36.813Z",
      updatedAt: "2023-04-17T14:18:36.813Z",
    },
    {
      _id: "643d55dad1c6dd3e2ebe6e39",
      title: "assembler sdelat nado",
      description: "5 laboratorka",
      categories: [],
      isCompleted: false,
      deadline: null,
      user: "63f6342acc86923016194255",
      createdAt: "2023-04-17T14:21:14.476Z",
      updatedAt: "2023-04-17T14:21:14.476Z",
    },
    {
      _id: "643d5884d1c6dd3e2ebe6e3b",
      title: "valera",
      description: "requ",
      categories: [],
      isCompleted: false,
      deadline: null,
      user: "63f6342acc86923016194255",
      createdAt: "2023-04-17T14:32:36.275Z",
      updatedAt: "2023-04-17T14:32:36.275Z",
    },
    {
      _id: "643d5898d1c6dd3e2ebe6e3d",
      title: "fffggf",
      description: "aaa",
      categories: [],
      isCompleted: true,
      deadline: null,
      user: "63f6342acc86923016194255",
      createdAt: "2023-04-17T14:32:56.160Z",
      updatedAt: "2023-04-17T14:32:56.160Z",
    },
    {
      _id: "643d58b0d1c6dd3e2ebe6e3f",
      title: "completed",
      description: "lalala",
      categories: [],
      isCompleted: true,
      deadline: null,
      user: "63f6342acc86923016194255",
      createdAt: "2023-04-17T14:33:20.263Z",
      updatedAt: "2023-04-17T14:33:20.263Z",
    },
    {
      _id: "643d58cdd1c6dd3e2ebe6e41",
      title: "lalaaaaaa",
      description: "valeraaaaaa",
      categories: [],
      isCompleted: true,
      deadline: null,
      user: "63f6342acc86923016194255",
      createdAt: "2023-04-17T14:33:49.892Z",
      updatedAt: "2023-04-17T14:33:49.892Z",
    },
    {
      _id: "643d592cd1c6dd3e2ebe6e43",
      title: "aaaa",
      description: "aaa",
      categories: [],
      isCompleted: false,
      deadline: null,
      user: "63f6342acc86923016194255",
      createdAt: "2023-04-17T14:35:24.306Z",
      updatedAt: "2023-04-17T14:35:24.306Z",
    },
    {
      _id: "643d59c3b40197d78a0691e3",
      title: "lalala",
      description: "lox",
      categories: [],
      isCompleted: false,
      deadline: null,
      user: "63f6342acc86923016194255",
      createdAt: "2023-04-17T14:37:55.956Z",
      updatedAt: "2023-04-17T14:37:55.956Z",
    },
    {
      _id: "643d5a0eb40197d78a0691e5",
      title: "ghgfh",
      description: "sadsds",
      categories: [],
      isCompleted: false,
      deadline: null,
      user: "63f6342acc86923016194255",
      createdAt: "2023-04-17T14:39:10.098Z",
      updatedAt: "2023-04-17T14:39:10.098Z",
    },
    {
      _id: "643d5a24b40197d78a0691e7",
      title: "fgh",
      description: "ghhg",
      categories: [],
      isCompleted: false,
      deadline: "2023-04-17T14:39:32.871Z",
      user: "63f6342acc86923016194255",
      createdAt: "2023-04-17T14:39:32.871Z",
      updatedAt: "2023-04-17T14:39:32.871Z",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

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
      <div className={styles.tasksWrapper}>
        <div className={styles.tasks}>
          {Tasks.map((el) => (
            <TaskCard task={el} />
          ))}
        </div>
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
    </main>
  );
};

export default Tasks;
