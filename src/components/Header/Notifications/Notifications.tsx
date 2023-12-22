import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import notificationsAPI, { Notification } from '../../../api/notificationsApi';
import socketsAPI from '../../../api/socketsAPI';

import styles from './Notifications.module.scss';
import ROUTES from '../../../routes';
import { truncate } from '../../../helpers/string';
import { Status } from '../../../types';
import { error } from 'console';

const Notifications = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const NOTIFICATION_TYPES_COLLECTION = {
    'subtask-confirmation': 'subtaskConfirmation',
  };

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  function toggleNotifications() {
    setIsNotificationsOpen((prev) => !prev);
  }

  function removeNotification(id: string) {
    setNotifications((prev) =>
      prev.filter((notification) => notification._id !== id),
    );
  }

  useEffect(() => {
    async function getNotifications() {
      setIsLoading(true);
      const notifications = await notificationsAPI.getNotifications();
      const {
        currentPage,
        totalPages,
        status,
        notifications: notificationsList,
        message: errorMessage,
      } = notifications;

      if (status === Status.SUCCESS) {
        setNotifications(notificationsList);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
        setErrorMessage('');
      } else {
        setErrorMessage(errorMessage || 'Error');
      }

      setIsLoading(false);

      const socket = socketsAPI.getSocket();

      socket.on('newSubtaskConfirmation', (notification: Notification) => {
        console.log('newSubtaskConfirmation', notification);
        setNotifications((prev) => [...prev, notification]);
      });

      socket.on('delSubtaskConfirmation', (notifId: string) => {
        console.log('delSubtaskConfirmation', notifId);
        setNotifications((prev) => prev.filter((el) => el._id !== notifId));
      });
    }
    getNotifications();
  }, []);

  const NotificationsList = () => {
    return (
      <>
        {notifications.map((notification) => (
          <div key={notification._id} className={styles.notification}>
            <p className={styles.notificationType}>
              {t(NOTIFICATION_TYPES_COLLECTION[notification.type])}
            </p>
            <div className={styles.user}>
              <img
                className={styles.userAvatar}
                src={
                  notification.userId.avatar?.url ||
                  'https://res.cloudinary.com/dmbythxia/image/upload/v1697126412/samples/animals/cat.jpg'
                }
                alt="avatar"
              />
              <div className={styles.taskInfosection}>
                <p className={styles.userName}>
                  {notification.userId.username}
                </p>
                <p className={styles.taskName}>
                  {truncate(notification.subtaskId.title, 20)}
                </p>
              </div>
              <div className={styles.buttons}>
                <button
                  className={styles.accept}
                  onClick={() => {
                    socketsAPI.confirmSubtask(notification.subtaskId._id);
                    removeNotification(notification._id);
                    navigate(ROUTES.PROFILE);
                    setTimeout(() => {
                      navigate(ROUTES.HOME);
                    }, 0);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={styles.acceptIcon}
                  />
                </button>
                <button
                  className={styles.decline}
                  onClick={() => {
                    socketsAPI.rejectSubtask(notification.subtaskId._id);
                    removeNotification(notification._id);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={styles.declineIcon}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const EmptyNotificationsList = () => {
    return <p style={{ textAlign: 'center' }}>No notifications</p>;
  };

  const ErrorNotificationsList = ({ error }: { error: string }) => {
    return <p style={{ textAlign: 'center' }}>{error}</p>;
  };

  function GetContent(error: string, length: number, loading: boolean) {
    if (loading) {
      return null;
    } else if (error) {
      return <ErrorNotificationsList error={error} />;
    } else if (length === 0) {
      return <EmptyNotificationsList />;
    } else {
      return <NotificationsList />;
    }
  }

  return (
    <div className={styles.wrapper}>
      <FontAwesomeIcon
        icon={faBell}
        className={styles.bell}
        onClick={toggleNotifications}
      />
      <div className={styles.notificationsList}>
        {isNotificationsOpen &&
          GetContent(errorMessage, notifications.length, isLoading)}
      </div>
    </div>
  );
};

export default Notifications;
