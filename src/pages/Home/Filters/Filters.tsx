import React, { useState } from "react";
import Preloader from "../../../components/Preloader/Preloader";
import { useAppSelector } from "../../../hooks";
import {
  selectCategories,
  selectCategoriesrError,
  selectCategoriesStatus,
  selectCategoryCurrentPage,
  selectCategoryTotalPages,
} from "../../../redux/slices/tasks/selectors";
import { fetchCategories } from "../../../redux/slices/tasks/thunk";
import { useAppDispatch } from "../../../redux/store";
import Category from "./Category/Category";
import styles from "./Filters.module.scss";

const Filters = () => {
  const categories = useAppSelector(selectCategories);
  const status = useAppSelector(selectCategoriesStatus);
  const currentPage = useAppSelector(selectCategoryCurrentPage);
  const totalPages = useAppSelector(selectCategoryTotalPages);
  const message = useAppSelector(selectCategoriesrError);
  const dispatch = useAppDispatch();
  const [hasDeadline, setHasDeadline] = useState(false);
  const [date, setDate] = useState("all");
  const [isCompleted, setIsCompleted] = useState("all");

  const loadMore = () => {
    const newPage = 1 + currentPage;
    dispatch(fetchCategories({ page: newPage }));
  };

  const handleCategoriesScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const isScrolled = scrollHeight === scrollTop + clientHeight;
    if (currentPage < totalPages && isScrolled) loadMore();
  };
  return (
    <aside className={styles.filtersWrapper}>
      <section className={styles.categoriesWrapper}>
        <h2>Categories</h2>
        <div className={styles.categories} onScroll={handleCategoriesScroll}>
          {categories.length === 0 && status === "success" ? (
            <p>you have not categories</p>
          ) : (
            categories.map((el, id) => <Category {...el} key={id} />)
          )}
          {status === "loading" && <Preloader />}
        </div>

        {message && totalPages ? (
          <p className={styles.categoriesError}>{message}</p>
        ) : null}
      </section>
      <section className={styles.filtersWrapper}>
        <h2>Date and status</h2>

        <label>
          Сompletion status:
          <select
            value={isCompleted}
            onChange={(event) => setIsCompleted(event.target.value)}
          >
            <option value="true">Completed</option>
            <option value="false">In process</option>
            <option value="all">all</option>
          </select>
        </label>

        <label>
          <input
            type="checkbox"
            checked={hasDeadline}
            onChange={() => setHasDeadline((prev) => !prev)}
          />
          <span>Find tasks with deadline</span>
        </label>

        {hasDeadline && (
          <label>
            Choose Period
            <select
              value={date}
              onChange={(event) => setDate(event.target.value)}
            >
              <option value="day">day</option>
              <option value="week">week</option>
              <option value="month">month</option>
              <option value="all">all</option>
            </select>
          </label>
        )}
      </section>
    </aside>
  );
};

export default Filters;
