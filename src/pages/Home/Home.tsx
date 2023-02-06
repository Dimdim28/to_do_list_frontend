import React, { useEffect } from "react";
import withLoginRedirect from "../../hoc/withLoginRedirect";

import { clearCategories } from "../../redux/slices/home/home";
import { fetchCategories } from "../../redux/slices/home/thunk";
import { useAppDispatch } from "../../redux/store";
import Filters from "./FiltersBar/FiltersBar";
import styles from "./Home.module.scss";
import Tasks from "./Tasks/Tasks";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories({ page: 1 }));
    return () => {
      dispatch(clearCategories());
    };
  }, [dispatch]);

  return (
    <div className={styles.row}>
      <Filters />
      <Tasks />
    </div>
  );
};

export default withLoginRedirect(Home);
