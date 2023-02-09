import React, { useState } from "react";
import { Input } from "../../components/common/Input/Input";
import Preloader from "../../components/Preloader/Preloader";
import withLoginRedirect from "../../hoc/withLoginRedirect";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectProfile, selectIsAuth } from "../../redux/slices/auth/selectors";
import {
  selectProfileStatus,
  selectUserProfile,
} from "../../redux/slices/profile/selectors";
import { fetchUserProfile } from "../../redux/slices/profile/thunk";

import styles from "./Profile.module.scss";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector(selectProfile)?._id || "";
  const isAuth = useAppSelector(selectIsAuth);
  const profile = useAppSelector(selectUserProfile) || {
    username: "dima",
    avatarUrl: "",
    email: "dima@gmail.com",
    createdAt: "22-03-2020",
  };
  const status = useAppSelector(selectProfileStatus);
  const { email, username, avatarUrl, createdAt } = profile;
  const date = new Date(createdAt).toLocaleDateString();
  const [name, setName] = useState(username);

  React.useEffect(() => {
    if (isAuth) dispatch(fetchUserProfile({ id }));
  }, [dispatch, id, isAuth]);

  if (status === "loading") {
    return <Preloader />;
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          {avatarUrl && <img src={avatarUrl} alt="logo" />}
        </div>

        <div className={styles.info}>
          <div className={styles.line}>
            <p className={styles.name}>name:</p>
            <p className={styles.text}>{name}</p>
          </div>

          <div className={styles.line}>
            <p className={styles.name}>email:</p>
            <p className={styles.text}>{email}</p>
          </div>

          <div className={styles.line}>
            <p className={styles.name}>registered:</p>
            <p className={styles.text}>{date}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default withLoginRedirect(Profile);
