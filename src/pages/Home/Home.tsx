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
import Filters from "./Filters/Filters";
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

  if (isChecked && !isAuth) return <Navigate to="/auth/login" />;

  return (
    <div className={styles.row}>
      <Filters />
      <Tasks />
    </div>
  );
};

export default Home;
