import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../../hooks';
import { selectUserProfile } from '../../../../redux/slices/profile/selectors';

import styles from './ProfileData.module.scss';

interface DataLineProps {
  label: string;
  value: string;
}

const DataLine: FC<DataLineProps> = ({ label, value }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.line}>
      <p className={styles.name}>{t(label)}:</p>
      <p className={styles.text}>{value}</p>
    </div>
  );
};

const ProfileData: FC = () => {
  const profile = useAppSelector(selectUserProfile) || {
    email: '',
    createdAt: '',
  };

  const { email, createdAt } = profile;
  const date = new Date(createdAt).toLocaleDateString();

  return (
    <>
      <DataLine label="email" value={email} />
      <DataLine label="registrationDate" value={date} />
    </>
  );
};

export default ProfileData;
