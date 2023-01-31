import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import { setCategory } from "../../../../redux/slices/category/category";
import { useAppDispatch } from "../../../../redux/store";
import styles from "./Category.module.scss";

export interface CategoryProps {
  _id: string;
  title: string;
  user: string;
  color: string;
  key: number;
}

const Category: React.FC<CategoryProps> = (props) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.category} style={{ borderColor: props.color }}>
      {props.title}
      <div className={styles.icons}>
        <NavLink to={"category"}>
          <FontAwesomeIcon
            className={`${styles.icon} ${styles.pencil}`}
            onClick={() => dispatch(setCategory(props))}
            color="black"
            fontSize="15px"
            icon={faPencil}
          />
        </NavLink>
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
