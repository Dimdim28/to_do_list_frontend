import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../hooks";
import {
  selectIsAuth,
  selectIsChecked,
} from "../../redux/slices/auth/selectors";
import { clearCategories } from "../../redux/slices/home/home";
import { fetchCategories } from "../../redux/slices/home/thunk";
import { useAppDispatch } from "../../redux/store";
import ROUTES from "../../routes";
import Filters from "./FiltersBar/FiltersBar";
import styles from "./Home.module.scss";
import Tasks from "./Tasks/Tasks";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const isChecked = useAppSelector(selectIsChecked);
  useEffect(() => {
    dispatch(fetchCategories({ page: 1 }));
    return () => {
      dispatch(clearCategories());
    };
  }, [dispatch]);

  console.log(!isAuth, isChecked);
  if (!isAuth && isChecked) {
    console.log("redirected");
    return <Navigate to={`${ROUTES.AUTH}/${ROUTES.LOGIN}`} />;
  }

  return (
    <div className={styles.row}>
      <Filters />
      <Tasks />
    </div>
  );
};

export default Home;
