import React, { useState } from "react";
import styles from "./FiltersBar.module.scss";
import Filters, { Date, IsCompleted } from "./Filters/Filters";
import Categories from "./Categories/Categories";

const FiltersBar: React.FC = () => {
  const [hasDeadline, setHasDeadline] = useState<boolean>(false);
  const [date, setDate] = useState<Date>("all");
  const [isCompleted, setIsCompleted] = useState<IsCompleted>("all");
  return (
    <aside className={styles.filtersWrapper}>
      <Categories />
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
