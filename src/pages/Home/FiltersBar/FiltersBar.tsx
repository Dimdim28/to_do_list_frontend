import React from "react";

import Filters, { Date, IsCompleted } from "./Filters/Filters";
import Categories from "./Categories/Categories";
import { getTask } from "../../../api/taskAPI";

import styles from "./FiltersBar.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface FiltersBarProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  isCompleted: IsCompleted;
  setIsCompleted: React.Dispatch<React.SetStateAction<IsCompleted>>;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  taskFetchingParams: getTask;
  fetchTasks: (params: getTask) => void;
  isMobile?: boolean;
  setIsNavberOpened?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FiltersBar: React.FC<FiltersBarProps> = ({
  date,
  setDate,
  isCompleted,
  setIsCompleted,
  categories,
  setCategories,
  taskFetchingParams,
  fetchTasks,
  isMobile,
  setIsNavberOpened,
}) => {
  return (
    <aside
      className={isMobile ? styles.mobileFiltersWrapper : styles.filtersWrapper}
      role="list"
    >
      {isMobile && (
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={styles.close}
          onClick={() => {
            if (setIsNavberOpened) setIsNavberOpened(false);
          }}
        />
      )}
      <Categories
        activeCategories={categories}
        setActiveCategories={setCategories}
        taskFetchingParams={taskFetchingParams}
        fetchTasks={fetchTasks}
      />
      <Filters
        date={date}
        setDate={setDate}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
      />
    </aside>
  );
};

export default FiltersBar;
