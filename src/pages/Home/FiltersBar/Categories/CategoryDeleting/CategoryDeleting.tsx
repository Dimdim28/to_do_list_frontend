import React, { useState } from "react";

import Button from "../../../../../components/common/Button/Button";
import Preloader from "../../../../../components/Preloader/Preloader";

import { useAppDispatch } from "../../../../../hooks";
import { removeCategoryFromList } from "../../../../../redux/slices/home/home";
import categoryAPI, { Category } from "../../../../../api/categoryAPI";
import { Status } from "../../../../../types";
import { getTask } from "../../../../../api/taskAPI";
import { truncate } from "../../../../../helpers/string";

import styles from "./CategoryDeleting.module.scss";

interface CategoryDeletingProps {
  toggleActive: React.Dispatch<React.SetStateAction<boolean>>;
  childProps: Category & {
    fetchTasks: (params: getTask) => void;
    taskFetchingParams: getTask;
  };
}

export const CategoryDeleting: React.FC<CategoryDeletingProps> = ({
  toggleActive,
  childProps,
}) => {
  const { _id, title, color, fetchTasks, taskFetchingParams } = childProps;
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
      fetchTasks(taskFetchingParams);
      toggleActive(false);
    }
  };

  const cancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      {status === Status.LOADING ? (
        <Preloader data-testid="preloader" />
      ) : (
        <>
          <div className={styles.modalContent}>
            <p>Do you really want to delete:</p>  
            <h3 style={{ color }}>{
              truncate(title,12)
            }</h3>
            <p>category </p>
          </div>
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
