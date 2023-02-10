import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../hooks";
import { selectIsAuth, selectIsChecked } from "../redux/slices/auth/selectors";
import ROUTES from "../routes";

export const withHomeRedirect = (Component: React.FC<any>) => () => {
  const isAuth = useAppSelector(selectIsAuth);
  const isChecked = useAppSelector(selectIsChecked);
  if (isAuth && isChecked) return <Navigate to={ROUTES.HOME} />;
  return <Component />;
};

export default withHomeRedirect;
