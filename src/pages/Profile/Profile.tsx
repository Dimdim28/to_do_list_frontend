import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { Input } from "../../components/common/Input/Input";
import Preloader from "../../components/Preloader/Preloader";
import withLoginRedirect from "../../hoc/withLoginRedirect";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectProfile, selectIsAuth } from "../../redux/slices/auth/selectors";
import {
  selectProfileStatus,
  selectUserProfile,
} from "../../redux/slices/profile/selectors";
import {
  changeAvatar,
  fetchUserProfile,
} from "../../redux/slices/profile/thunk";

import styles from "./Profile.module.scss";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector(selectProfile)?._id || "";
  const isAuth = useAppSelector(selectIsAuth);
  const profile = useAppSelector(selectUserProfile) || {
    username: "",
    avatarUrl: "",
    email: "",
    createdAt: "",
  };
  const status = useAppSelector(selectProfileStatus);
  const { email, username, avatarUrl, createdAt } = profile;
  const date = new Date(createdAt).toLocaleDateString();

  const inputFileRef = useRef<HTMLInputElement>(null);

  //const [name, setName] = useState(username);

  const [isPassEditing, setIspassEditing] = useState(false);
  const [prevPass, setPrevPass] = useState("");
  const [newPass, setNewPass] = useState("");

  React.useEffect(() => {
    if (isAuth) dispatch(fetchUserProfile({ id }));
  }, [dispatch, id, isAuth]);

  const handleChangeFile = async (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    try {
      const formdata = new FormData();
      formdata.append("image", file);
      await dispatch(changeAvatar({ image: formdata }));
    } catch (e) {
      console.log(e);
    }
  };

  if (status === "loading") {
    return <Preloader />;
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.profile}>
        <div className={styles.row}>
          <div className={styles.avatar}>
            <input type="file" ref={inputFileRef} onChange={handleChangeFile} />
            {avatarUrl && <img src={avatarUrl} alt="logo" />}
            <div
              className={styles.addPhoto}
              onClick={() => inputFileRef.current?.click()}
            >
              <FontAwesomeIcon className={styles.camera} icon={faCirclePlus} />
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.line}>
              <p className={styles.name}>name:</p>
              <p className={styles.text}>{username}</p>
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

        <div className={styles.passwordWrapper}>
          <p
            className={styles.button}
            onClick={() => setIspassEditing((prev) => !prev)}
          >
            change password
          </p>

          <div className={isPassEditing ? styles.passEditing : styles.pass}>
            <div className={styles.input}>
              <Input
                title="password"
                value={prevPass}
                setValue={setPrevPass}
                type="password"
              />
            </div>

            <div className={styles.input}>
              <Input
                title="new password"
                value={newPass}
                setValue={setNewPass}
                type="password"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default withLoginRedirect(Profile);
