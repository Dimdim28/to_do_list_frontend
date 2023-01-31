import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Category.module.scss";

export interface CategoryProps {
  _id: string;
  title: string;
  user: string;
  color: string;
  key: number;
}

const Category: React.FC<CategoryProps> = (props) => {
  return (
    <div className={styles.category} style={{ borderColor: props.color }}>
      {props.title}
      <NavLink to={"category"}>
        <FontAwesomeIcon color="black" fontSize="15px" icon={faPencil} />
      </NavLink>
      <FontAwesomeIcon color="black" fontSize="15px" icon={faTrash} />
    </div>
  );
};

export default Category;
