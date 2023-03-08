import React, { useState } from "react";
import categoryAPI, { Category } from "../../../../../api/categoryAPI";
import Button from "../../../../../components/common/Button/Button";
import Preloader from "../../../../../components/Preloader/Preloader";
import { useAppDispatch } from "../../../../../hooks";
import { removeCategoryFromList } from "../../../../../redux/slices/home/home";
import { Status } from "../../../../../types";
import styles from "./CategoryDeleting.module.scss";

interface CategoryDeletingProps {
  toggleActive: React.Dispatch<React.SetStateAction<boolean>>;
  childProps: Category;
}

export const CategoryDeleting: React.FC<CategoryDeletingProps> = ({
  toggleActive,
  childProps,
}) => {
  const { _id, title, color } = childProps;
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(Status.SUCCESS);
  const [categoryError, setCategoryError] = useState("");
 
  const submit = async () => {
    setStatus(Status.LOADING);
    const result = await categoryAPI.deleteCategory(_id);
    const { message, status } = result;
    setStatus(status);
    setCategoryError(message || "");
    if (status === Status.SUCCESS) {
      dispatch(removeCategoryFromList(_id));
      toggleActive(false);
    }
  };

  const cancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      {status === Status.LOADING ? (
        <Preloader />
      ) : (
        <>
          <h3 className={styles.title}>
            Do you really want to delete <i style={{ color }}>{title}</i>{" "}
            category
          </h3>
          <div className={styles.buttons}>
            <Button text="cancel" callback={cancel} class="cancel" />
            <Button text="submit" callback={submit} class="submit" />
          </div>
          {categoryError && <p className={styles.error}>{categoryError}</p>}
        </>
      )}
    </div>
  );
};
