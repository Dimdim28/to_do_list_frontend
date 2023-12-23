import { useEffect, useState, UIEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import ROUTES from '../../../routes';
import notificationsAPI, { Notification } from '../../../api/notificationsApi';
import socketsAPI from '../../../api/socketsAPI';
import UserImage from '../../UserImage/UserImage';
import { Status } from '../../../types';
import { truncate } from '../../../helpers/string';

import styles from './Notifications.module.scss';

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

  const bellRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  function toggleNotifications() {
    setIsNotificationsOpen((prev) => !prev);
  }

  function removeNotification(id: string) {
    setNotifications((prev) =>
      prev.filter((notification) => notification._id !== id),
    );
  }

  async function getNotifications(page?: number, limit?: number) {
    setIsLoading(true);
    const notifications = await notificationsAPI.getNotifications(page, limit);
    const {
      currentPage,
      totalPages,
      status,
      notifications: notificationsList,
      message: errorMessage,
    } = notifications;

    if (status === Status.SUCCESS) {
      setNotifications((prev) => [...prev, ...notificationsList]);
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
      setNotifications((prev) => [notification, ...prev]);
    });

    socket.on('delSubtaskConfirmation', (notifId: string) => {
      console.log('delSubtaskConfirmation', notifId);
      setNotifications((prev) => prev.filter((el) => el._id !== notifId));
    });
  }

  async function loadMore() {
    await getNotifications(currentPage + 1);
  }

  const handleCategoriesScroll = (e: UIEvent<HTMLElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const isScrolled = scrollHeight === scrollTop + clientHeight;
    if (!isLoading && currentPage < totalPages && isScrolled) loadMore();
  };

  function handleClickOutside(e: MouseEvent) {
    if (
      !bellRef.current?.contains(e.target as Node) &&
      !listRef.current?.contains(e.target as Node)
    ) {
      setIsNotificationsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    getNotifications();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
              <UserImage user={notification.userId} size="large" />
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
    if (error) {
      return <ErrorNotificationsList error={error} />;
    } else if (length === 0 && !loading) {
      return <EmptyNotificationsList />;
    } else {
      return <NotificationsList />;
    }
  }

  return (
    <div className={styles.wrapper}>
      <button ref={bellRef} onClick={toggleNotifications}>
        <FontAwesomeIcon icon={faBell} className={styles.bell} />
      </button>
      {isNotificationsOpen && (
        <div
          ref={listRef}
          className={styles.notificationsList}
          onScroll={handleCategoriesScroll}
        >
          {GetContent(errorMessage, notifications.length, isLoading)}
          {isLoading && <p style={{ textAlign: 'center' }}>Loading...</p>}
        </div>
      )}
    </div>
  );
};

export default Notifications;
