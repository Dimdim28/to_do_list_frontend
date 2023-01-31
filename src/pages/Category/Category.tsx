import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../hooks";
import {
  selectIsAuth,
  selectIsChecked,
  selectProfile,
} from "../../redux/slices/auth/selectors";
import {
  // selectCategoryInfo,
  selectCategoryrError,
} from "../../redux/slices/category/selectors";
import { createCategory } from "../../redux/slices/category/thunk";
import { useAppDispatch } from "../../redux/store";

const Category: React.FC = () => {
  const dispatch = useAppDispatch();
  // const category = useAppSelector(selectCategoryInfo);
  const categoryError = useAppSelector(selectCategoryrError);
  const user = useAppSelector(selectProfile);

  const isAuth = useAppSelector(selectIsAuth);
  const isChecked = useAppSelector(selectIsChecked);
  if (!isAuth && isChecked) return <Navigate to="/auth/login" />;

  return (
    <div>
      Category
      <button
        onClick={() =>
          dispatch(
            createCategory({
              title: "fisting",
              user: user ? user._id : "",
              color: "hello",
            })
          )
        }
      >
        create
      </button>
      {categoryError && <p>{categoryError}</p>}
    </div>
  );
};

export default Category;
