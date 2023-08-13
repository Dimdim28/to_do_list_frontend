import { Dispatch, SetStateAction, FC} from "react";

import Filters, { Date, IsCompleted } from "./Filters/Filters";
import Categories from "./Categories/Categories";
import { getTask } from "../../../api/taskAPI";

import styles from "./FiltersBar.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface FiltersBarProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  isCompleted: IsCompleted;
  setIsCompleted: Dispatch<SetStateAction<IsCompleted>>;
  categories: string[];
  setCategories: Dispatch<SetStateAction<string[]>>;
  taskFetchingParams: getTask;
  fetchTasks: (params: getTask) => void;
  isMobile?: boolean;
  setIsNavberOpened?: Dispatch<SetStateAction<boolean>>;
}

const FiltersBar: FC<FiltersBarProps> = ({
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
