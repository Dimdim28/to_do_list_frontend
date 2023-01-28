import React from "react";
import styles from "./Category.module.scss";

export interface CategoryProps {
  _id: string;
  title: string;
  user: string;
  color: string;
  key: number;
}

const Category = (props: CategoryProps) => {
  console.log(props);
  return (
    <div className={styles.category} style={{ borderColor: props.color }}>
      {props.title}
    </div>
  );
};

export default Category;
