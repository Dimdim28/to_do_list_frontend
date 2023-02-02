import React, { useState } from "react";
import { Navigate } from "react-router";
import Button from "../../components/common/Button/Button";
import { useAppSelector } from "../../hooks";
import {
  selectIsAuth,
  selectIsChecked,
} from "../../redux/slices/auth/selectors";
import { clearCategory } from "../../redux/slices/category/category";
import {
  selectCategoryInfo,
  selectCategoryrError,
} from "../../redux/slices/category/selectors";
import {
  createCategory,
  updateCategory,
} from "../../redux/slices/category/thunk";
import { useAppDispatch } from "../../redux/store";
import { selectProfile } from "../../redux/slices/auth/selectors";
import styles from "./CategoryForm.module.scss";

interface CategoryFormProps {
  toggleActive?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryForm: React.FC<CategoryFormProps> = (props) => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategoryInfo);
  const categoryError = useAppSelector(selectCategoryrError);
  const isAuth = useAppSelector(selectIsAuth);
  const isChecked = useAppSelector(selectIsChecked);

  const userId = useAppSelector(selectProfile)?._id;
  const previousColor = (category && category.color) || "#000000";
  const previousTitle = (category && category.title) || "";
  const categoryId = (category && category._id) || "";
  const [color, setColor] = useState(previousColor);
  const [title, setTittle] = useState(previousTitle);

  function create() {
    return dispatch(
      createCategory({
        title: title,
        user: userId || "",
        color: color,
      })
    );
  }

  function update() {
    return dispatch(
      updateCategory({
        title: title,
        color: color,
        _id: categoryId,
      })
    );
  }

  if (!isAuth && isChecked) return <Navigate to="/auth/login" />;
  const callback = () => {
    category ? update() : create();
  };

  const submit = async () => {
    await callback();
    dispatch(clearCategory());
    console.log("before =", categoryError, color, title);
    if (categoryError === undefined) {
      console.log("after =", categoryError, color, title);
      props.toggleActive && props.toggleActive(false);
      setColor(previousColor);
      setTittle(previousTitle);
      dispatch(clearCategory());
    }
    console.log("result=", categoryError, color, title);
  };

  const cancel = () => {
    props.toggleActive && props.toggleActive(false);
    setColor(previousColor);
    setTittle(previousTitle);
    dispatch(clearCategory());
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Category color</h2>
      <input
        className={styles.chooseColor}
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <h2 className={styles.title}> Category title</h2>
      <input
        className={styles.chooseTitle}
        type="text"
        value={title}
        onChange={(e) => setTittle(e.target.value)}
      />
      <div className={styles.buttons}>
        <Button text="submit" callback={submit} class="submit" />
        <Button text="cancel" callback={cancel} class="cancel" />
      </div>

      {categoryError && <p className={styles.error}>{categoryError}</p>}
    </div>
  );
};

export default CategoryForm;
