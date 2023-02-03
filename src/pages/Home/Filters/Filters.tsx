import React, { useEffect, useState } from "react";
import { Checkbox } from "../../../components/common/Checkbox/Checkbox";
import { Modal } from "../../../components/common/Modal/Modal";
import Select from "../../../components/common/Select/Select";
import Preloader from "../../../components/Preloader/Preloader";
import { useAppSelector } from "../../../hooks";
import { setCategory } from "../../../redux/slices/category/category";
import {
  selectCategories,
  selectCategoriesrError,
  selectCategoriesStatus,
  selectCategoryCurrentPage,
  selectCategoryTotalPages,
} from "../../../redux/slices/home/selectors";
import { fetchCategories } from "../../../redux/slices/home/thunk";
import { useAppDispatch } from "../../../redux/store";
import CategoryForm from "../../CategoryForm/CategoryForm";
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
  const [categoryEditing, setCategoryEditing] = useState(false);

  const loadMore = () => {
    const newPage = 1 + currentPage;
    dispatch(fetchCategories({ page: newPage }));
  };

  const handleCategoriesScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const isScrolled = scrollHeight === scrollTop + clientHeight;
    if (status !== "loading" && currentPage < totalPages && isScrolled)
      loadMore();
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

  useEffect(() => {
    console.log("category updated");
  }, [categories]);

  return (
    <aside className={styles.filtersWrapper}>
      <section className={styles.categoriesWrapper}>
        <h2>Categories</h2>
        <div className={styles.categories} onScroll={handleCategoriesScroll}>
          {categories.length === 0 && status === "success" ? (
            <p>you have not categories</p>
          ) : (
            categories.map((el, id) => (
              <Category
                {...el}
                key={id}
                setCategoryEditing={setCategoryEditing}
              />
            ))
          )}
          {status === "loading" && <Preloader />}
        </div>
        <p
          className={styles.addCategory}
          onClick={() => {
            setCategoryEditing(true);
            dispatch(setCategory(null));
          }}
        >
          Create Category +
        </p>
        {message === "undefined" ? (
          <p className={styles.categoriesError}>Server error</p>
        ) : message ? (
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

      <Modal
        active={categoryEditing}
        setActive={setCategoryEditing}
        ChildComponent={CategoryForm}
      />
    </aside>
  );
};

export default Filters;
