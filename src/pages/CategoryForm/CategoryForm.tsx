import React, { useState } from "react";
import Button from "../../components/common/Button/Button";
import { useAppDispatch } from "../../redux/store";
import styles from "./CategoryForm.module.scss";
import Preloader from "../../components/Preloader/Preloader";
import { Category, sendCategory, Status } from "../../api/sendCategory";
import { useAppSelector } from "../../hooks";
import { selectProfile } from "../../redux/slices/auth/selectors";
import { updateCategoryInList } from "../../redux/slices/home/home";
interface CategoryFormProps {
  toggleActive: React.Dispatch<React.SetStateAction<boolean>>;
  childProps: Category;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  childProps,
  toggleActive,
}) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectProfile)?._id;
  const [status, setStatus] = useState(Status.SUCCESS);
  const [categoryError, setCategoryError] = useState("");
  const { _id, title: prevTitle, color: prevColor } = childProps;
  const [color, setColor] = useState(prevColor || "#000000");
  const [title, setTittle] = useState(prevTitle || "");

  const submit = async () => {
    setStatus(Status.LOADING);
    const result = await sendCategory({ _id, title, user: userId, color });
    const { message, status } = result;
    setStatus(status);
    setCategoryError(message || "");
    if (status === Status.SUCCESS) {
      toggleActive(false);
      if (_id) {
        dispatch(updateCategoryInList({ _id, title, color }));
      }
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
