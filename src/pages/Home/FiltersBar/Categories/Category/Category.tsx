import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./Category.module.scss";
export interface CategoryProps {
  _id: string;
  title: string;
  user: string;
  color: string;
  key: number;
  isForTask?: boolean;
  setCategoryEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryInfo: React.Dispatch<React.SetStateAction<{}>>;
  setActiveCategories: React.Dispatch<React.SetStateAction<string[]>>;
  isActive: boolean;
}

const Category: React.FC<CategoryProps> = ({
  setCategoryInfo,
  setCategoryDeleting,
  setCategoryEditing,
  setActiveCategories,
  isForTask,
  isActive,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      onClick={() => {
        if (isActive) {
          setActiveCategories((prev) => prev.filter((el) => el !== props._id));
        } else {
          setActiveCategories((prev) => [...prev, props._id]);
        }
      }}
      className={isForTask ? styles.tasksFormCategory : styles.category}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ borderColor: hover || isActive ? "#f97316" : props.color }}
    >
      <span className={isActive ? styles.activeTitle : styles.title}>
        {props.title}
      </span>
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
