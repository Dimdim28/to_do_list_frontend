import React, { useEffect, useState } from "react";
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
  selectCategoryError,
  selectCategoryStatus,
} from "../../redux/slices/category/selectors";
import { sendCategory } from "../../redux/slices/category/thunk";
import { useAppDispatch } from "../../redux/store";
import { selectProfile } from "../../redux/slices/auth/selectors";
import styles from "./CategoryForm.module.scss";
import Preloader from "../../components/Preloader/Preloader";

interface CategoryFormProps {
  toggleActive?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryForm: React.FC<CategoryFormProps> = (props) => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategoryInfo);
  const categoryError = useAppSelector(selectCategoryError);
  const isAuth = useAppSelector(selectIsAuth);
  const isChecked = useAppSelector(selectIsChecked);
  const categoryStatus = useAppSelector(selectCategoryStatus);
  const userId = useAppSelector(selectProfile)?._id;
  const previousColor = category?.color || "#000000";
  const previousTitle = category?.title || "";
  const categoryId = (category && category._id) || "";
  const [color, setColor] = useState(previousColor);
  const [title, setTittle] = useState(previousTitle);

  useEffect(() => {
    setColor(previousColor);
    setTittle(previousTitle);
  }, [previousColor, previousTitle]);

  if (!isAuth && isChecked) return <Navigate to="/auth/login" />;

  const submit = async () => {
    const data: any = await dispatch(
      sendCategory({ title, color, user: userId, _id: categoryId })
    );
    if (!data.error) {
      props.toggleActive && props.toggleActive(false);
      setColor("#000000");
      setTittle("");
      dispatch(clearCategory());
    }
  };

  const cancel = () => {
    props.toggleActive && props.toggleActive(false);
    setColor("#000000");
    setTittle("");
    dispatch(clearCategory());
  };

  return (
    <div className={styles.wrapper}>
      {["loading", "empty"].includes(categoryStatus) ? (
        <Preloader />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default CategoryForm;
