import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../hooks";
import { selectIsAuth, selectIsChecked } from "../../redux/slices/auth/selectors";
import styles from "./Profile.module.scss";

const Profile: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const isChecked = useAppSelector(selectIsChecked);

  if (!isAuth && isChecked) return <Navigate to="/auth/login" />;

  return <div className={styles.row}>Profile</div>;
};

export default Profile;
