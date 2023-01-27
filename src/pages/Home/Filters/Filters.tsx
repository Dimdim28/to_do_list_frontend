import React from "react";
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
import styles from "./Filters.module.scss";

const Filters = () => {
  const categories = useAppSelector(selectCategories);
  const status = useAppSelector(selectCategoriesStatus);
  const currentPage = useAppSelector(selectCategoryCurrentPage);
  const totalPages = useAppSelector(selectCategoryTotalPages);
  const message = useAppSelector(selectCategoriesrError);
  const dispatch = useAppDispatch();

  const loadMore = React.useCallback(() => {
    const newPage = 1 + currentPage;
    console.log("newPage =", newPage);
    dispatch(fetchCategories({ page: newPage, limit: 2 }));
  }, [dispatch, currentPage]);

  return (
    <aside className={styles.wrapper}>
      {status === "loading" ? (
        <p>loading</p>
      ) : categories.length === 0 ? (
        <p>you have not categories</p>
      ) : (
        categories.map((el, id) => <div key={id}>{el.title}</div>)
      )}
      {message && <p>{message}</p>}
      {currentPage < totalPages && (
        <button onClick={loadMore}>load more</button>
      )}
    </aside>
  );
};

export default Filters;
