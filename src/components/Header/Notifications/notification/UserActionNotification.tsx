import { FC } from 'react';
import { useNavigate } from 'react-router';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';

import { truncate } from '../../../../helpers/string';
import ROUTES from '../../../../routes';
import {
  Notification,
  TRANSLATION_NOTIFICATION_TYPES_COLLECTION,
} from '../../../../types/entities/Notification';
import UserImage from '../../../UserImage/UserImage';

import styles from './styles.module.scss';

interface UserActionNotificationProps {
  notification: Notification;
  handleReadNotification: (notification: Notification) => void;
}

const UserActionNotification: FC<UserActionNotificationProps> = ({
  notification,
  handleReadNotification,
}) => {
  const navigate = useNavigate();

  const goToProfile = (id: string) => {
    navigate(`${ROUTES.PROFILE}/${id}`);
  };

  return (
    <div key={notification._id} className={styles.notification}>
      <p className={styles.notificationType}>
        {t(TRANSLATION_NOTIFICATION_TYPES_COLLECTION[notification.type])}
      </p>
      <div className={styles.user}>
        <UserImage
          user={{
            ...notification.actionByUser,
            avatar: notification.actionByUser?.avatar,
          }}
          onAvatarClick={(user) => {
            goToProfile(user._id);
          }}
          size="large"
        />
        <div className={styles.taskInfosection}>
          <p className={styles.userName}>
            {truncate(notification?.actionByUser?.username || 'User', 16)}
          </p>
          <p className={styles.taskName}>
            {truncate(notification.subtask.title || '', 16)}
          </p>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.decline}
            onClick={() => {
              handleReadNotification(notification);
            }}
          >
            <FontAwesomeIcon icon={faXmark} className={styles.declineIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserActionNotification;
