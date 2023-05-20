import React, { useState } from "react";
import styles from "./FiltersBar.module.scss";
import Filters, { Date, IsCompleted } from "./Filters/Filters";
import Categories from "./Categories/Categories";
import { Category } from "../../../api/taskAPI";

const FiltersBar: React.FC = () => {
  const [hasDeadline, setHasDeadline] = useState<boolean>(false);
  const [date, setDate] = useState<Date>("all");
  const [isCompleted, setIsCompleted] = useState<IsCompleted>("all");
  const [categories, setCategories] = useState<Category[]>([]);

  return (
    <aside className={styles.filtersWrapper}>
      <Categories
        activeCategories={categories}
        setActiveCategories={setCategories}
      />
      <Filters
        hasDeadline={hasDeadline}
        setHasDeadline={setHasDeadline}
        date={date}
        setDate={setDate}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
      />
    </aside>
  );
};

export default FiltersBar;
