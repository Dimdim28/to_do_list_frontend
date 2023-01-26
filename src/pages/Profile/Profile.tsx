import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../hooks";
import { selectIsAuth } from "../../redux/slices/auth/selectors";
import styles from "./Profile.module.scss";

const Profile: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  if (!isAuth) return <Navigate to="/auth/login" />;

  return <div className={styles.row}>Profile</div>;
};

export default Profile;
