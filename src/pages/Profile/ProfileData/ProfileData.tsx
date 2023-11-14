import { FC } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../../../hooks";
import { selectUserProfile } from "../../../redux/slices/profile/selectors";

import styles from "./ProfileData.module.scss";

const ProfileData: FC = () => {
  const { t } = useTranslation();

  const profile = useAppSelector(selectUserProfile) || {
    email: "",
    createdAt: "",
  };
  const { email, createdAt } = profile;
  const date = new Date(createdAt).toLocaleDateString();

  return (
    <div>
      <div className={styles.line}>
        <p className={styles.name}>{t("email")}:</p>
        <p className={styles.text}>{email}</p>
      </div>

      <div className={styles.line}>
        <p className={styles.name}>{t("registered")}:</p>
        <p className={styles.text}>{date}</p>
      </div>
    </div>
  );
};

export default ProfileData;
