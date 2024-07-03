import { FC } from 'react';
import { User } from '../../../../api/userAPI';
import { useTranslation } from 'react-i18next';

import UserImage from '../../../../components/UserImage/UserImage';

import styles from './ChosenUser.module.scss';
import ROUTES from '../../../../routes';

interface ChosenUserProps {
  user: User;
  removeUser: () => void;
  isForCreation: boolean;
}

const ChosenUser: FC<ChosenUserProps> = ({
  user,
  removeUser,
  isForCreation,
}) => {
  const { t } = useTranslation();

  const goToProfile = (id: string) => {
    window.open(`${ROUTES.PROFILE}/${id}`, '_blank');
  };

  return (
    <>
      <h3 className={styles.title}>{t('chosenUser')}</h3>
      <div className={styles.user}>
        <UserImage
          user={user}
          onAvatarClick={(user) => {
            goToProfile(user._id);
          }}
        />
        <p className={styles.userName}>{user.username}</p>
        {isForCreation && (
          <button className={styles.removeUser} onClick={removeUser}>
            {t('remove')}
          </button>
        )}
      </div>
    </>
  );
};

export default ChosenUser;
