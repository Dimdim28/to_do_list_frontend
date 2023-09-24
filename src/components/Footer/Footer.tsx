import { FC } from "react";
import { useTranslation } from "react-i18next";

import styles from "./Footer.module.scss";

const Footer: FC = () => {
  const { t } = useTranslation();
  return <footer className={styles.footer}>{t("footer")}</footer>;
};

export default Footer;