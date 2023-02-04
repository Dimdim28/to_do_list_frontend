import React, { useState } from "react";
import { Navigate } from "react-router";
import { Input } from "../../components/common/Input/Input";
import { useAppSelector } from "../../hooks";
import {
  selectIsAuth,
  selectIsChecked,
} from "../../redux/slices/auth/selectors";
import styles from "./Profile.module.scss";

const Profile: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const isChecked = useAppSelector(selectIsChecked);
  const [name, setName] = useState("");

  if (!isAuth && isChecked) return <Navigate to="/auth/login" />;

  return (
    <div className={styles.row}>
      Profile
      <Input title="name" value={name} setValue={setName} type="password" />
    </div>
  );
};

export default Profile;
