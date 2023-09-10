import { FC } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectTheme } from "../../redux/slices/auth/selectors";
import ROUTES from "../../routes";
import { Theme } from "../../types";

import styles from "./Header.module.scss";

import logo from "../../assets/logo.png";
import { changeTheme } from "../../redux/slices/auth/auth";

const Header: FC = () => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(selectTheme);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    localStorage.setItem("theme", newTheme);
    dispatch(changeTheme(newTheme));
  };

  return (
    <header>
      <div className={styles.actionsWrapper}>
        <img className={styles.logo} alt="logo" src={logo} />
        <FontAwesomeIcon
          icon={theme === Theme.DARK ? faMoon : faSun}
          className={styles.themeIcon}
          onClick={toggleTheme}
        />
      </div>

      <nav>
        <NavLink
          to={ROUTES.PROFILE}
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >
          Profile
        </NavLink>
        <NavLink
          to={ROUTES.HOME}
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >
          Home
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
