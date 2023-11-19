import React, { useState, FC } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "../../../../hooks";
import { clearProfileErrorMessage } from "../../../../redux/slices/profile/profile";

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
    <div className={styles.buttons} data-testid="buttons-container">
      <button
        className={styles.exit}
        onClick={() => handleButtonClick(() => setIsExiting(true))}
        data-testid="exit-button-component"
      >
        {t("logOut")}
      </button>

      <button
        className={styles.changePass}
        onClick={() =>
          handleButtonClick(() => setIspassEditing((prev) => !prev))
        }
        data-testid="change-password-button-component"
      >
        {t(isPassEditing ? "closePasswordChange" : "changePassword")}
      </button>

      <button
        className={styles.delete}
        onClick={() => handleButtonClick(() => setIsAccountDeleting(true))}
        data-testid="delete-account-button-component"
      >
        {t("deleteAccount")}
      </button>
    </div>
  );
};

export default Buttons;
