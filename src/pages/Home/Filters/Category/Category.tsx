import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { setCategory } from "../../../../redux/slices/category/category";
import { useAppDispatch } from "../../../../redux/store";
import styles from "./Category.module.scss";

export interface CategoryProps {
  _id: string;
  title: string;
  user: string;
  color: string;
  key: number;
  setCategoryEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const Category: React.FC<CategoryProps> = (props) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.category} style={{ borderColor: props.color }}>
      <span className={styles.title}>{props.title}</span>
      <div className={styles.icons}>
        <FontAwesomeIcon
          className={`${styles.icon} ${styles.pencil}`}
          onClick={() => {
            dispatch(setCategory(props));
            props.setCategoryEditing(true);
          }}
          color="black"
          fontSize="15px"
          icon={faPencil}
        />
        <FontAwesomeIcon
          color="black"
          fontSize="15px"
          icon={faTrash}
          className={`${styles.icon} ${styles.trash}`}
        />
      </div>
    </div>
  );
};

export default Category;
