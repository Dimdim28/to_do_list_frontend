import React, { useState } from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../hooks";
import {
  selectIsAuth,
  selectIsChecked,
} from "../../redux/slices/auth/selectors";
import {
  selectCategoryInfo,
  selectCategoryrError,
} from "../../redux/slices/category/selectors";
import {
  createCategory,
  updateCategory,
} from "../../redux/slices/category/thunk";
import { useAppDispatch } from "../../redux/store";

const Category: React.FC = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategoryInfo);
  const categoryError = useAppSelector(selectCategoryrError);
  const isAuth = useAppSelector(selectIsAuth);
  const isChecked = useAppSelector(selectIsChecked);

  const userId = category && category.user;
  const previousColor = (category && category.color) || "#000000";
  const previousTitle = (category && category.title) || "";
  const categoryId = (category && category._id) || "";
  const [color, setColor] = useState(previousColor);
  const [title, setTittle] = useState(previousTitle);

  function create() {
    return dispatch(
      createCategory({
        title: title,
        user: userId || "",
        color: color,
      })
    );
  }

  function update() {
    return dispatch(
      updateCategory({
        title: title,
        color: color,
        _id: categoryId,
      })
    );
  }

  if (!isAuth && isChecked) return <Navigate to="/auth/login" />;

  return (
    <div>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <input
        type="text"
        value={title}
        onChange={(e) => setTittle(e.target.value)}
      />

      <div>{color}</div>
      <div>{title}</div>

      <button onClick={() => (category ? update() : create())}>create</button>
      {categoryError && <p>{categoryError}</p>}
    </div>
  );
};

export default Category;
