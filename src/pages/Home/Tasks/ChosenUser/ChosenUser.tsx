import { FC } from 'react';
import { User } from '../../../../api/userAPI';
import { useTranslation } from 'react-i18next';

import styles from './ChosenUser.module.scss';

interface ChosenUserProps {
  user: User;
  removeUser: () => void;
}

const ChosenUser: FC<ChosenUserProps> = ({ user, removeUser }) => {
  const { t } = useTranslation();

  return (
    <>
      <h3 className={styles.title}>{t('chosenUser')}</h3>
      <div className={styles.user}>
        <img
          className={styles.userAvatar}
          src={
            user.avatar?.url ||
            'https://res.cloudinary.com/dmbythxia/image/upload/v1697126412/samples/animals/cat.jpg'
          }
          alt="user avatar"
        />
        <p className={styles.userName}>{user.username}</p>
        <button className={styles.removeUser} onClick={removeUser}>
          {t('remove')}
        </button>
      </div>
    </>
  );
};

export default ChosenUser;
