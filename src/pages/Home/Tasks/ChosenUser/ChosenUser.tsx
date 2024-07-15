import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import UserImage from '../../../../components/UserImage/UserImage';
import ROUTES from '../../../../routes';
import { User } from '../../../../types/shared';

import styles from './ChosenUser.module.scss';

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
