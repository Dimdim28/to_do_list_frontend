import React, { useState, FC } from "react";
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

  const [isPassEditing] = useState(false);

  const handleButtonClick = (action: () => void) => {
    dispatch(clearProfileErrorMessage());
    action();
  };

  return (
    <div className={styles.buttons}>
      <button
        className={styles.exit}
        onClick={() => handleButtonClick(() => setIsExiting(true))}
      >
        {t("logOut")}
      </button>

      <button
        className={styles.button}
        onClick={() =>
          handleButtonClick(() => setIspassEditing((prev) => !prev))
        }
      >
        {t(isPassEditing ? "closePasswordChange" : "changePassword")}
      </button>

      <button
        className={styles.delete}
        onClick={() => handleButtonClick(() => setIsAccountDeleting(true))}
      >
        {t("deleteAccount")}
      </button>
    </div>
  );
};

export default Buttons;
