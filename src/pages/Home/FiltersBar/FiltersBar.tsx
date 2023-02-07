import React, { useState } from "react";
import styles from "./FiltersBar.module.scss";
import Filters, { FiltersState } from "./Filters/Filters";
import Categories from "./Categories/Categories";
const FiltersBar: React.FC = () => {
  const [filters, setFilters] = useState<FiltersState>({
    hasDeadline: false,
    date: "all",
    isCompleted: "all",
  });

  return (
    <aside className={styles.filtersWrapper}>
      <Categories />
      <Filters data={filters} setData={setFilters} />
    </aside>
  );
};

export default FiltersBar;
