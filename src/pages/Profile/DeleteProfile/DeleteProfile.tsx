import { Dispatch, SetStateAction, FC } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../../components/common/Button/Button";
import Preloader from "../../../components/Preloader/Preloader";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { logout } from "../../../redux/slices/auth/auth";
import { selectProfile } from "../../../redux/slices/auth/selectors";
import { clear } from "../../../redux/slices/home/home";
import {
  selectProfileMessage,
  selectProfileStatus,
} from "../../../redux/slices/profile/selectors";
import { deleteAccount } from "../../../redux/slices/profile/thunk";
import { Status } from "../../../types";

import { selectTheme } from "../../../redux/slices/auth/selectors";
import { Theme } from "../../../types";
import { changeTheme } from "../../../redux/slices/auth/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import styles from "./DeleteProfile.module.scss";

interface DeleteAccountProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}

const DeleteProfile: FC<DeleteAccountProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const theme = useAppSelector(selectTheme);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    localStorage.setItem("theme", newTheme);
    dispatch(changeTheme(newTheme));
  };

  const changeLanguage = () => {
    const language = i18n.language;
    const getNewLanguage = () => {
      if (language === "en") return "ua";
      if (language === "ua") return "en";
      return "en";
    };
    const newLanguage = getNewLanguage();
    i18n.changeLanguage(newLanguage);
  };

  const userId = useAppSelector(selectProfile)?._id || "";
  const status = useAppSelector(selectProfileStatus);
  const error = useAppSelector(selectProfileMessage);

  const submit = async () => {
    const result: any = await dispatch(deleteAccount({ id: userId }));
    if (result.payload.message) {
      dispatch(logout());
      dispatch(clear());
      toggleActive(false);
    }
  };

  const cancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.actionsWrapper}>
        <FontAwesomeIcon
          icon={theme === Theme.DARK ? faSun : faMoon}
          className={styles.themeIcon}
          onClick={toggleTheme}
        />
        <button className={styles.language} onClick={changeLanguage}>
          {i18n.language}
        </button>
      </div>
      {status === Status.LOADING ? (
        <Preloader />
      ) : (
        <>
          <h3 className={styles.title}>{t("areYouSure")}</h3>
          <div className={styles.buttons}>
            <Button text={t("no")} callback={cancel} class="cancel" />
            <Button text={t("yes")} callback={submit} class="submit" />
          </div>

          {status === Status.ERROR && <p className={styles.error}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default DeleteProfile;
