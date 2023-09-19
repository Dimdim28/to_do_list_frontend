import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ROUTES from "../../routes";

import styles from "./Footer.module.scss";

const Footer: FC = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
  <div className={styles.leftAlignedText}>
  <NavLink
          to={ROUTES.FAQ}
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >
          {t("faq")}
        </NavLink>
        <NavLink
          to={ROUTES.HOME}
          className={({ isActive }) => (isActive ? styles.isActive : "")}
        >
          {t("home")}
        </NavLink>
  </div>
  <div className={styles.centeredText}>
    {t("footer")}
  </div>
</footer>
  );
};

export default Footer;
