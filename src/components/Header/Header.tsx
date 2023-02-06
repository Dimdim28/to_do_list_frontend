import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";
import ROUTES from "../../routes";
const Header: React.FC = () => {
  return (
    <header>
      <img className={styles.logo} alt="logo" src={logo} />
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
