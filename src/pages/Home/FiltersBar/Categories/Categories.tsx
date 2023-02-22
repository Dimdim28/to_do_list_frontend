import React, { useState } from "react";
import { Modal } from "../../../../components/common/Modal/Modal";
import Preloader from "../../../../components/Preloader/Preloader";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  selectCategories,
  selectCategoriesrError,
  selectCategoriesStatus,
  selectCategoryCurrentPage,
  selectCategoryTotalPages,
} from "../../../../redux/slices/home/selectors";
import { fetchCategories } from "../../../../redux/slices/home/thunk";
import CategoryForm from "./CategoryForm/CategoryForm";
import Category from "./Category/Category";
import styles from "./Categories.module.scss";
import { CategoryDeleting } from "./CategoryDeleting/CategoryDeleting";

const Categories: React.FC = () => {
  const categories = useAppSelector(selectCategories);
  const status = useAppSelector(selectCategoriesStatus);
  const currentPage = useAppSelector(selectCategoryCurrentPage);
  const totalPages = useAppSelector(selectCategoryTotalPages);
  const message = useAppSelector(selectCategoriesrError);
  const dispatch = useAppDispatch();

  const [categoryEditing, setCategoryEditing] = useState(false);
  const [categoryProps, setCategoryProps] = useState({});
  const [categoryDeleting, setCategoryDeleting] = useState(false);
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
  return (
    <>
      <section className={styles.categoriesWrapper}>
        <h3>Categories</h3>
        <div className={styles.categories} onScroll={handleCategoriesScroll}>
          {categories.length === 0 && status === "success" ? (
            <p>you have not categories</p>
          ) : (
            categories.map((el, id) => (
              <Category
                {...el}
                key={id}
                setCategoryEditing={setCategoryEditing}
                setCategoryInfo={setCategoryProps}
                setCategoryDeleting={setCategoryDeleting}
              />
            ))
          )}
          {status === "loading" && <Preloader />}
        </div>
        <p
          className={styles.addCategory}
          onClick={() => {
            setCategoryProps({});
            setCategoryEditing(true);
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
      <Modal
        active={categoryEditing}
        setActive={setCategoryEditing}
        ChildComponent={CategoryForm}
        childProps={categoryProps}
      />
      <Modal
        active={categoryDeleting}
        setActive={setCategoryDeleting}
        ChildComponent={CategoryDeleting}
        childProps={categoryProps}
      />
    </>
  );
};

export default Categories;
