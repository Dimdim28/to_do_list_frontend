import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../hooks";
import { selectIsAuth } from "../../redux/slices/auth/selectors";

const Task: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  if (!isAuth) return <Navigate to="/auth/login" />;

  return <div>Task</div>;
};

export default Task;
