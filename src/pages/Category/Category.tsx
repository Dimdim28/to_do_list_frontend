import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import Button from "../../components/common/Button/Button";
import { useAppSelector } from "../../hooks";
import {
  selectIsAuth,
  selectIsChecked,
} from "../../redux/slices/auth/selectors";
import { clearCategory } from "../../redux/slices/category/category";
import {
  selectCategoryInfo,
  selectCategoryrError,
} from "../../redux/slices/category/selectors";
import {
  createCategory,
  updateCategory,
} from "../../redux/slices/category/thunk";
import { useAppDispatch } from "../../redux/store";
import { selectProfile } from "../../redux/slices/auth/selectors";

const Category: React.FC = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategoryInfo);
  const categoryError = useAppSelector(selectCategoryrError);
  const isAuth = useAppSelector(selectIsAuth);
  const isChecked = useAppSelector(selectIsChecked);

  const userId = useAppSelector(selectProfile)?._id;
  const previousColor = (category && category.color) || "#000000";
  const previousTitle = (category && category.title) || "";
  const categoryId = (category && category._id) || "";
  const [color, setColor] = useState(previousColor);
  const [title, setTittle] = useState(previousTitle);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(clearCategory());
    };
  }, [dispatch]);

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
  const callback = () => {
    category ? update() : create();
  };

  const submit = async () => {
    await callback();
    console.log(categoryError);
    if (!categoryError) {
      navigate("/");
    }
  };

  const cancel = () => {
    navigate("/");
  };

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
      <Button text="submit" callback={submit} class="submit" />
      <Button text="cancel" callback={cancel} class="cancel" />
      {categoryError && <p>{categoryError}</p>}
    </div>
  );
};

export default Category;
