import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../hooks";
import { selectIsAuth } from "../../redux/slices/auth/selectors";

const Category: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  if (!isAuth) return <Navigate to="/auth/login" />;

  return <div>Category</div>;
};

export default Category;
