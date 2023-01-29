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
  const [isChecked, setIsChecked] = useState(false);

  const loadMore = () => {
    const newPage = 1 + currentPage;
    console.log("newPage =", newPage);
    dispatch(fetchCategories({ page: newPage }));
  };

  return (
    <aside className={styles.filtersWrapper}>
      <section className={styles.categoriesWrapper}>
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
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)}
          />
          <span>isCompleted</span>
        </label>
      </section>
    </aside>
  );
};

export default Filters;
