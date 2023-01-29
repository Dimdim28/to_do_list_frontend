import React, { useState } from "react";
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
    console.log("newPage =", newPage);
    dispatch(fetchCategories({ page: newPage }));
  };

  return (
    <aside className={styles.filtersWrapper}>
      <section className={styles.categoriesWrapper}>
        <h2>Categories</h2>
        <div className={styles.categories}>
          {status !== "error" && categories.length === 0 ? (
            <p>loading</p>
          ) : categories.length === 0 ? (
            <p>you have not categories</p>
          ) : (
            categories.map((el, id) => <Category {...el} key={id} />)
          )}
        </div>

        {message && totalPages ? (
          <p className={styles.categoriesError}>{message}</p>
        ) : null}
        {currentPage < totalPages && (
          <button onClick={loadMore}>load more</button>
        )}
      </section>
      <section className={styles.filtersWrapper}>
        <h2>Date and status</h2>

        <label>
          Choose Status
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
          <span>Has task Deadline?</span>
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
