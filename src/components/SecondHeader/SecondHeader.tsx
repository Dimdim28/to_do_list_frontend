import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectLanguage, selectTheme } from "../../redux/slices/auth/selectors";
import { Language, Theme } from "../../types";
import { changeLang, changeTheme } from "../../redux/slices/auth/auth";

import styles from "./SecondHeader.module.scss";

import logo from "../../assets/logo.png";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const theme = useAppSelector(selectTheme);
  const language = useAppSelector(selectLanguage);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    localStorage.setItem("theme", newTheme);
    dispatch(changeTheme(newTheme));
  };

  const togglelang = (language: Language) => {
    const getNewLanguage = (): Language => {
      if (language === Language.EN) return Language.UA;
      if (language === Language.UA) return Language.EN;
      return Language.EN;
    };
    const newLanguage = getNewLanguage();
    i18n.changeLanguage(newLanguage);
    dispatch(changeLang(newLanguage));
  };

  return (
    <header>
      <div className={styles.actionsWrapper}>
        <img className={styles.logo} alt="logo" src={logo} />
        <FontAwesomeIcon
          icon={theme === Theme.DARK ? faSun : faMoon}
          className={styles.themeIcon}
          onClick={toggleTheme}
        />
        <button
          className={styles.language}
          onClick={() => {
            togglelang(language);
          }}
        >
          {i18n.language}
        </button>
      </div>
    </header>
  );
};

export default Header;
