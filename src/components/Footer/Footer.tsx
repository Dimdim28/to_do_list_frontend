import { FC } from "react";

import styles from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      To do list will help you to manage your tasks
    </footer>
  );
};

export default Footer;
