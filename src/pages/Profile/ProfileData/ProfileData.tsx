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

  const renderLine = (label: string, value: string) => (
    <div className={styles.line}>
      <p className={styles.name}>{t(label)}:</p>
      <p className={styles.text}>{value}</p>
    </div>
  );

  return (
    <div>
      {renderLine("email", email)}
      {renderLine("registered", date)}
    </div>
  );
};

export default ProfileData;
