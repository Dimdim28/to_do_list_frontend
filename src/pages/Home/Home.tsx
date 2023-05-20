import React, { useEffect, useState } from "react";
import withLoginRedirect from "../../hoc/withLoginRedirect";
import { useAppDispatch } from "../../hooks";

import { clearCategories } from "../../redux/slices/home/home";
import { fetchCategories } from "../../redux/slices/home/thunk";
import Filters from "./FiltersBar/FiltersBar";
import styles from "./Home.module.scss";
import Tasks from "./Tasks/Tasks";
import { IsCompleted, Date } from "./FiltersBar/Filters/Filters";
import { Category } from "../../api/taskAPI";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<Date>("all");
  const [isCompleted, setIsCompleted] = useState<IsCompleted>("all");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    dispatch(fetchCategories({ page: 1 }));
    return () => {
      dispatch(clearCategories());
    };
  }, [dispatch]);

  return (
    <div className={styles.row}>
      <Filters
        date={date}
        setDate={setDate}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
        categories={categories}
        setCategories={setCategories}
      />
      <Tasks currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default withLoginRedirect(Home);
