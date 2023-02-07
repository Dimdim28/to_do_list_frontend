import React, { useState } from "react";
import { Input } from "../../components/common/Input/Input";
import withLoginRedirect from "../../hoc/withLoginRedirect";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectProfile, selectIsAuth } from "../../redux/slices/auth/selectors";
import { fetchUserProfile } from "../../redux/slices/profile/thunk";

import styles from "./Profile.module.scss";

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();
  const id = useAppSelector(selectProfile)?._id || "";
  const isAuth = useAppSelector(selectIsAuth);
  console.log(id);
  React.useEffect(() => {
    if (isAuth) dispatch(fetchUserProfile({ id }));
  }, [dispatch, id, isAuth]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <div className={styles["profile__data"]}>
          <div className={styles["profile__avatar"]}>
            <img src="https://i.imgur.com/gqJvKwW.png" alt="Error" />
          </div>
          <div className={styles["profile__info"]}>
            <div>
              <div className="profile__username">
                <p>Username</p>
                <p>noobmaster669</p>
              </div>
              <div className="profile__email">
                <p>Email</p>
                <p>noob@gmail.com</p>
              </div>
            </div>
            <div className={styles["profile__btn"]}>
              <button>Change profile</button>
              <button>Change password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLoginRedirect(Profile);
