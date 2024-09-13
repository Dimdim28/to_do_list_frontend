import { FC } from 'react';
import { useNavigate } from 'react-router';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';

import { truncate } from '../../../../helpers/string';
import ROUTES from '../../../../routes';
import {
  ConfirmNotification,
  TRANSLATION_NOTIFICATION_TYPES_COLLECTION,
} from '../../../../types/entities/Notification';
import UserImage from '../../../UserImage/UserImage';

import styles from './styles.module.scss';

interface UserConfirmNotificationProps {
  notification: ConfirmNotification;
  handleRejectSubtask: (notification: ConfirmNotification) => void;
  handleAcceptSubTask: (notification: ConfirmNotification) => void;
}

const UserConfirmNotification: FC<UserConfirmNotificationProps> = ({
  notification,
  handleRejectSubtask,
  handleAcceptSubTask,
}) => {
  const navigate = useNavigate();
  console.log(notification.type);

  const goToProfile = (id: string) => {
    navigate(`${ROUTES.PROFILE}/${id}`);
  };

  return (
    <div className={styles.notification}>
      <p className={styles.notificationType}>
        {t(TRANSLATION_NOTIFICATION_TYPES_COLLECTION[notification.type])}
      </p>
      <div className={styles.user}>
        <UserImage
          user={{
            ...notification.creator,
            avatar: notification.creator?.avatar,
          }}
          onAvatarClick={(user) => {
            goToProfile(user._id);
          }}
          size="large"
        />
        <div className={styles.taskInfosection}>
          <p className={styles.userName}>
            {truncate(notification?.creator?.username || 'User', 16)}
          </p>
          <p className={styles.taskName}>
            {truncate(notification.subtaskId.title, 16)}
          </p>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.accept}
            onClick={() => {
              handleAcceptSubTask(notification);
            }}
          >
            <FontAwesomeIcon icon={faCheck} className={styles.acceptIcon} />
          </button>
          <button
            className={styles.decline}
            onClick={() => {
              handleRejectSubtask(notification);
            }}
          >
            <FontAwesomeIcon icon={faXmark} className={styles.declineIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserConfirmNotification;
