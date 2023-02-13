import { faCirclePlus, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "../../components/common/Modal/Modal";
import Preloader from "../../components/Preloader/Preloader";
import withLoginRedirect from "../../hoc/withLoginRedirect";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectProfile, selectIsAuth } from "../../redux/slices/auth/selectors";
import {
  selectProfileMessage,
  selectProfileStatus,
  selectUserProfile,
} from "../../redux/slices/profile/selectors";
import {
  changeAvatar,
  fetchUserProfile,
} from "../../redux/slices/profile/thunk";
import { ChangePass } from "./ChangePass/ChangePass";
import DeleteProfile from "./DeleteProfile/DeleteProfile";
import Exit from "./Exit/Exit";

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
  const message = useAppSelector(selectProfileMessage);
  const { email, username, avatarUrl, createdAt } = profile;
  const date = new Date(createdAt).toLocaleDateString();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [isPassEditing, setIspassEditing] = useState(false);
  const [isAccountDeleting, setIsAccountDeleting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [name, setName] = useState(username);

  React.useEffect(() => {
    if (isAuth) dispatch(fetchUserProfile({ id }));
  }, [dispatch, id, isAuth]);

  const handleChangeFile = async (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    try {
      const formdata = new FormData();
      formdata.append("image", file);
      await dispatch(changeAvatar({ image: formdata, userId: id }));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setName(username);
  }, [username]);

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
              {isNameEditing ? (
                <input
                  className={styles.inputName}
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  onBlur={() => setIsNameEditing(false)}
                />
              ) : (
                <>
                  <p className={styles.text}>{name}</p>
                  <div
                    onClick={() => {
                      setIsNameEditing(true);
                    }}
                  >
                    <FontAwesomeIcon
                      className={`${styles.icon} ${styles.pencil}`}
                      onClick={() => {}}
                      color="rgb(163, 163, 163)"
                      fontSize="15px"
                      icon={faPencil}
                    />
                  </div>
                </>
              )}
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

          <div className={styles.buttons}>
            <p
              className={styles.exit}
              onClick={() => {
                setIsExiting(true);
              }}
            >
              log out
            </p>

            <p
              className={styles.button}
              onClick={() => setIspassEditing((prev) => !prev)}
            >
              change password
            </p>

            <p
              className={styles.delete}
              onClick={() => {
                setIsAccountDeleting(true);
              }}
            >
              delete account
            </p>
          </div>

          {isAccountDeleting && (
            <Modal
              active={isAccountDeleting}
              setActive={setIsAccountDeleting}
              ChildComponent={DeleteProfile}
              childProps={{ toggleActive: setIsAccountDeleting }}
            />
          )}
          {isExiting && (
            <Modal
              active={isExiting}
              setActive={setIsExiting}
              ChildComponent={Exit}
              childProps={{ toggleActive: setIsExiting }}
            />
          )}
        </div>

        {isPassEditing && (
          <div className={styles.passwordWrapper}>
            <div className={styles.passEditing}>
              <ChangePass id={id} />
            </div>
          </div>
        )}
        {status === "error" && <p className={styles.error}>{message}</p>}
      </div>
    </main>
  );
};

export default withLoginRedirect(Profile);
