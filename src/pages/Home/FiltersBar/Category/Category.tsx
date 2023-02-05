import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Category.module.scss";

export interface CategoryProps {
  _id: string;
  title: string;
  user: string;
  color: string;
  key: number;
  setCategoryEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryInfo: React.Dispatch<React.SetStateAction<{}>>;
}

const Category: React.FC<CategoryProps> = ({
  setCategoryInfo,
  setCategoryDeleting,
  setCategoryEditing,
  ...props
}) => {
  return (
    <div className={styles.category} style={{ borderColor: props.color }}>
      <span className={styles.title}>{props.title}</span>
      <div className={styles.icons}>
        <FontAwesomeIcon
          className={`${styles.icon} ${styles.pencil}`}
          onClick={() => {
            setCategoryInfo(props);
            setCategoryEditing(true);
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
          onClick={() => {
            setCategoryInfo(props);
            setCategoryDeleting(true);
          }}
        />
      </div>
    </div>
  );
};

export default Category;
