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
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      className={styles.category}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ borderColor: hover ? "#f97316" : props.color }}
    >
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
