import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";
const Header: React.FC = () => {
  return (
    <header>
      <img className={styles.logo} alt="logo" src={logo} />
      <nav>
        <NavLink
          to={"profile"}
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >
          Profile
        </NavLink>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >
          Home
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
