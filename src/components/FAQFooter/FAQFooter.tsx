import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ROUTES from "../../routes";

import styles from "./FAQFooter.module.scss";

const LINKS = [
  {
    path: ROUTES.FAQ,
    name: "faq",
  },
  {
    path: ROUTES.HOME,
    name: "back",
  },
];

const FAQFooter: FC = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <nav className={styles.leftAlignedText}>
        {LINKS.map(({ path, name }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              isActive ? styles.isActive : undefined
            }
          >
            {t(name)}
          </NavLink>
        ))}
      </nav>
      <div className={styles.centeredText}>{t("footer")}</div>
    </footer>
  );
};

export default FAQFooter;
