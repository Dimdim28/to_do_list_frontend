import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "../../../../hooks";
import { clearProfileErrorMessage } from "../../../../redux/slices/profile/profile";
import { changeName } from "../../../../redux/slices/profile/thunk";

import styles from "./Name.module.scss";

import { faCheck, faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NameProps {
  isNameEditing: boolean;
  setIsNameEditing: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}

const Name: FC<NameProps> = ({ isNameEditing, setIsNameEditing, name, setName, id }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const sumbitChangeName = async () => {
    await dispatch(changeName({ userId: id, username: name }));
    setIsNameEditing(false);
  };

  const cancelChangeName = async () => {
    setIsNameEditing(false);
    setName(name);
  };

  return (
    <div className={styles.line}>
      <p className={styles.name}>{t("name")}:</p>
      {isNameEditing ? (
        <>
          <input
            className={styles.inputName}
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <FontAwesomeIcon
            onClick={sumbitChangeName}
            className={styles.check}
            icon={faCheck}
          />
          <FontAwesomeIcon
            onClick={cancelChangeName}
            className={styles.close}
            icon={faX}
          />
        </>
      ) : (
        <>
          <p className={styles.text}>{name}</p>
          <div
            onClick={() => {
              dispatch(clearProfileErrorMessage());
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
  );
};

export default Name;
