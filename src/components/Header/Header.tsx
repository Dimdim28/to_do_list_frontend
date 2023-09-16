import { FC } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectTheme } from "../../redux/slices/auth/selectors";
import ROUTES from "../../routes";
import { Theme } from "../../types";

import styles from "./Header.module.scss";

import logo from "../../assets/logo.png";
import { changeTheme } from "../../redux/slices/auth/auth";

const Header: FC = () => {
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

  return (
    <header>
      <div className={styles.actionsWrapper}>
        <img className={styles.logo} alt="logo" src={logo} />
        <FontAwesomeIcon
          icon={theme === Theme.DARK ? faSun : faMoon}
          className={styles.themeIcon}
          onClick={toggleTheme}
        />
        <button className={styles.language} onClick={changeLanguage}>
          {i18n.language}
        </button>
      </div>

      <nav>
        <NavLink
          to={ROUTES.PROFILE}
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >
          {t("profile")}
        </NavLink>
        <NavLink
          to={ROUTES.HOME}
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >
          {t("home")}
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
