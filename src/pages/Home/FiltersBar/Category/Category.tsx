import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { deleteCategory, Status } from "../../../../api/deleteCategory";
import styles from "./Category.module.scss";

export interface CategoryProps {
  _id: string;
  title: string;
  user: string;
  color: string;
  key: number;
  setCategoryEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryInfo: React.Dispatch<React.SetStateAction<{}>>;
}

const Category: React.FC<CategoryProps> = ({ setCategoryInfo, ...props }) => {
  const [status, setStatus] = useState(Status.SUCCESS);
  const [categoryError, setCategoryError] = useState("");

  const removeCategory = async () => {
    setStatus(Status.LOADING);
    const result = await deleteCategory(props._id);
    const { message, status } = result;
    setStatus(status);
    setCategoryError(message || "");
    // if (status === Status.SUCCESS) {
    //   if (_id) {
    //     dispatch(updateCategoryInList({ _id, title, color }));
    //   } else {
    //     dispatch(addCategoryToList(result.category));
    //   }
    // }
  };

  return (
    <div className={styles.category} style={{ borderColor: props.color }}>
      <span className={styles.title}>{props.title}</span>
      <div className={styles.icons}>
        <FontAwesomeIcon
          className={`${styles.icon} ${styles.pencil}`}
          onClick={() => {
            setCategoryInfo(props);
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
          onClick={removeCategory}
        />
      </div>
    </div>
  );
};

export default Category;
