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

import newNotificationAudio from '../../../assets/newNotif.ogg';
import scrollAudio from '../../../assets/scroll.mp3';

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
  const [realTimeNotificationsCount, setRealTimeNotificationsCount] =
    useState(0);

  const bellRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef(new Audio(newNotificationAudio));
  const scrollRef = useRef(new Audio(scrollAudio));

  function toggleNotifications() {
    setIsNotificationsOpen((prev) => !prev);
  }

  function removeNotification(id: string) {
    setNotifications((prev) =>
      prev.filter((notification) => notification._id !== id),
    );
  }

  async function getNotifications(
    page?: number,
    skip?: number,
    limit?: number,
  ) {
    setIsLoading(true);
    const notifications = await notificationsAPI.getNotifications(
      page,
      limit,
      skip,
    );
    const {
      currentPage,
      totalPages,
      status,
      notifications: notificationsList,
      message: errorMessage,
    } = notifications;

    if (status === Status.SUCCESS) {
      setNotifications((prev) => [...prev, ...notificationsList]);
      setCurrentPage(+currentPage);
      setTotalPages(+totalPages);
      setErrorMessage('');
    } else {
      setErrorMessage(errorMessage || 'Error');
    }

    setIsLoading(false);

    const socket = socketsAPI.getSocket();

    socket.on('newSubtaskConfirmation', (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setRealTimeNotificationsCount((prev) => prev + 1);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    });

    socket.on('delSubtaskConfirmation', (notifId: string) => {
      setNotifications((prev) => prev.filter((el) => el._id !== notifId));
      setRealTimeNotificationsCount((prev) => prev - 1);
    });
  }

  async function loadMore() {
    await getNotifications(currentPage + 1, realTimeNotificationsCount);
  }

  const handleNotificationsListScroll = (e: UIEvent<HTMLElement>) => {
    scrollRef.current.pause();
    scrollRef.current.currentTime = 0;
    scrollRef.current.play();
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
                  {truncate(notification?.userId?.username || 'User', 16)}
                </p>
                <p className={styles.taskName}>
                  {truncate(notification.subtaskId.title, 16)}
                </p>
              </div>
              <div className={styles.buttons}>
                <button
                  className={styles.accept}
                  onClick={() => {
                    socketsAPI.confirmSubtask(notification.subtaskId._id);
                    setRealTimeNotificationsCount((prev) => prev - 1);
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
                    setRealTimeNotificationsCount((prev) => prev - 1);
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
    return <p className={styles.noNotifications}>{t('noNotifications')}</p>;
  };

  const ErrorNotificationsList = ({ error }: { error: string }) => {
    return <p className={styles.errorMessage}>{error}</p>;
  };

  const LoadingNotificationsList = () => {
    return (
      <div className={styles.loaderWrapper}>
        <span className={styles.loader}></span>
      </div>
    );
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
          onScroll={handleNotificationsListScroll}
        >
          {GetContent(errorMessage, notifications.length, isLoading)}
          {isLoading && <LoadingNotificationsList />}
        </div>
      )}
    </div>
  );
};

export default Notifications;
