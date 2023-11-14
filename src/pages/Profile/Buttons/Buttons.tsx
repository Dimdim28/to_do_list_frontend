import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "../../../hooks";
import { clearProfileErrorMessage } from "../../../redux/slices/profile/profile";

import styles from "./Buttons.module.scss";

interface ButtonsProps {
  setIsExiting: React.Dispatch<React.SetStateAction<boolean>>;
  setIspassEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

const Buttons: FC<ButtonsProps> = ({
  setIsExiting,
  setIspassEditing,
  setIsAccountDeleting,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <div className={styles.buttons}>
      <button
        className={styles.exit}
        onClick={() => {
          dispatch(clearProfileErrorMessage());
          setIsExiting(true);
        }}
      >
        {t("logOut")}
      </button>

      <button
        className={styles.button}
        onClick={() => {
          dispatch(clearProfileErrorMessage());
          setIspassEditing((prev) => !prev);
        }}
      >
        {t("changePassword")}
      </button>

      <button
        className={styles.delete}
        onClick={() => {
          dispatch(clearProfileErrorMessage());
          setIsAccountDeleting(true);
        }}
      >
        {t("deleteAccount")}
      </button>
    </div>
  );
};

export default Buttons;
