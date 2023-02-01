import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Checkbox } from "../../../components/common/Checkbox/Checkbox";
import Select from "../../../components/common/Select/Select";
import Preloader from "../../../components/Preloader/Preloader";
import { useAppSelector } from "../../../hooks";
import {
  selectCategories,
  selectCategoriesrError,
  selectCategoriesStatus,
  selectCategoryCurrentPage,
  selectCategoryTotalPages,
} from "../../../redux/slices/home/selectors";
import { fetchCategories } from "../../../redux/slices/home/thunk";
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
  const navigate = useNavigate();
  const loadMore = () => {
    const newPage = 1 + currentPage;
    dispatch(fetchCategories({ page: newPage }));
  };

  const handleCategoriesScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const isScrolled = scrollHeight === scrollTop + clientHeight;
    if (currentPage < totalPages && isScrolled) loadMore();
  };

  const selectStatusOptions = [
    { name: "Completed", value: "true" },
    { name: "In process", value: "false" },
    { name: "all", value: "all" },
  ];

  const selectDateOptions = [
    { name: "day", value: "day" },
    { name: "week", value: "week" },
    { name: "month", value: "month" },
    { name: "all", value: "all" },
  ];

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
        <p className={styles.addCategory} onClick={() => navigate("/category")}>
          Create Category +
        </p>
        {message && totalPages ? (
          <p className={styles.categoriesError}>{message}</p>
        ) : null}
      </section>
      <section className={styles.dateWrapper}>
        <h2>Date and status</h2>
        <Select
          items={selectStatusOptions}
          width="200px"
          activeValue={isCompleted}
          callback={setIsCompleted}
        />
        <Checkbox
          isChecked={hasDeadline}
          setIsChecked={setHasDeadline}
          label="With deadline"
        />
        {hasDeadline && (
          <Select
            items={selectDateOptions}
            activeValue={date}
            width="200px"
            callback={setDate}
          />
        )}
        date: {date}
        <br />
        isCompleted: {isCompleted}
      </section>
    </aside>
  );
};

export default Filters;
