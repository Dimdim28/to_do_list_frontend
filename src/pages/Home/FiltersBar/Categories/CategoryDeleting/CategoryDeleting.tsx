import { useState, Dispatch, SetStateAction, FC } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../../../../components/common/Button/Button";
import Preloader from "../../../../../components/Preloader/Preloader";

import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { removeCategoryFromList } from "../../../../../redux/slices/home/home";
import categoryAPI, { Category } from "../../../../../api/categoryAPI";
import { Status } from "../../../../../types";
import { getTask } from "../../../../../api/taskAPI";
import { truncate } from "../../../../../helpers/string";

import { selectTheme } from "../../../../../redux/slices/auth/selectors";
import { Theme } from "../../../../../types";
import { changeTheme } from "../../../../../redux/slices/auth/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import styles from "./CategoryDeleting.module.scss";

interface CategoryDeletingProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: Category & {
    fetchTasks: (params: getTask) => void;
    taskFetchingParams: getTask;
  };
}

export const CategoryDeleting: FC<CategoryDeletingProps> = ({
  toggleActive,
  childProps,
}) => {
  const { _id, title, color, fetchTasks, taskFetchingParams } = childProps;

  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const theme = useAppSelector(selectTheme);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    localStorage.setItem("theme", newTheme);
    dispatch(changeTheme(newTheme));
  };

  const changeLanguage = () => {
    const language = i18n.language;
    const getNewLanguage = () => {
      if (language === "en") return "ua";
      if (language === "ua") return "en";
      return "en";
    };
    const newLanguage = getNewLanguage();
    i18n.changeLanguage(newLanguage);
  };
  
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
    <div className={styles.actionsWrapper}>
        <FontAwesomeIcon
          icon={theme === Theme.DARK ? faSun : faMoon}
          className={styles.themeIcon}
          onClick={toggleTheme}
        />
        <button className={styles.language} onClick={changeLanguage}>
          {i18n.language}
        </button>
      </div>
      {status === Status.LOADING ? (
        <Preloader data-testid="preloader" />
      ) : (
        <>
          <div className={styles.modalContent}>
            <p>{t("reallyСategory")}</p>  
            <h3 style={{ color }}>{
              truncate(title,12)
            }</h3>
          </div>
          <div className={styles.buttons}>
            <Button text={t("no")} callback={cancel} class="cancel" />
            <Button text={t("yes")} callback={submit} class="submit" />
          </div>
          {categoryError && <p className={styles.error}>{categoryError}</p>}
        </>
      )}
    </div>
  );
};
