import { UIEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import notificationsAPI from '../../../api/notificationsApi';
import socketsAPI from '../../../api/socketsAPI';
import newNotificationAudio from '../../../assets/newNotification.mp3';
import ROUTES from '../../../routes';
import {
  ConfirmNotification,
  Notification,
  NotificationServerEvents,
  NotificationType,
} from '../../../types/entities/Notification';
import { Status } from '../../../types/shared';

import UserActionNotification from './notification/UserActionNotification';
import UserConfirmNotification from './notification/UserConfirmNotification';

import styles from './Notifications.module.scss';

const Notifications = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [notifications, setNotifications] = useState<
    (Notification | ConfirmNotification)[]
  >([]);
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
  // const scrollRef = useRef(new Audio(scrollAudio));

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
      console.log(notifications);
    } else {
      setErrorMessage(errorMessage || 'Error');
    }

    setIsLoading(false);

    const socket = socketsAPI.getSocket();

    socket.on(
      NotificationServerEvents.NEW_SUBTASK_CONFIRMATION,
      (notification: Notification) => {
        setNotifications((prev) => [notification, ...prev]);
        setRealTimeNotificationsCount((prev) => prev + 1);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      },
    );

    socket.on(
      NotificationServerEvents.DEL_SUBTASK_CONFIRMATION,
      (notifId: string) => {
        setNotifications((prev) => prev.filter((el) => el._id !== notifId));
        setRealTimeNotificationsCount((prev) => prev - 1);
      },
    );

    socket.on(
      NotificationServerEvents.NEW_NOTIFICATION,
      (notification: Notification) => {
        setNotifications((prev) => [notification, ...prev]);
        setRealTimeNotificationsCount((prev) => prev + 1);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      },
    );
  }

  async function loadMore() {
    await getNotifications(currentPage + 1, realTimeNotificationsCount);
  }

  const handleNotificationsListScroll = (e: UIEvent<HTMLElement>) => {
    // scrollRef.current.pause();
    // scrollRef.current.currentTime = 0;
    // scrollRef.current.play();
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

  function handleAcceptSubTask(notification: ConfirmNotification) {
    socketsAPI.confirmSubtask(
      notification.subtaskId._id,
      notification.creator._id,
    );
    setRealTimeNotificationsCount((prev) => prev - 1);
    removeNotification(notification._id);
    navigate(ROUTES.PROFILE);
    setTimeout(() => {
      navigate(ROUTES.HOME);
    }, 0);
  }

  function handleRejectSubtask(notification: ConfirmNotification) {
    socketsAPI.rejectSubtask(
      notification.subtaskId._id,
      notification.creator._id,
    );
    removeNotification(notification._id);
    setRealTimeNotificationsCount((prev) => prev - 1);
  }

  function handleReadNotification(notification: Notification) {
    notificationsAPI.readNotification(notification._id, true);
    removeNotification(notification._id);
    setRealTimeNotificationsCount((prev) => prev - 1);
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
        {notifications.map((notification) => {
          if (notification.type === NotificationType.SUBTASK_CONFIRMATION) {
            return (
              <UserConfirmNotification
                notification={notification as ConfirmNotification}
                key={notification._id}
                handleRejectSubtask={handleRejectSubtask}
                handleAcceptSubTask={handleAcceptSubTask}
              />
            );
          }
          return (
            <UserActionNotification
              key={notification._id}
              handleReadNotification={handleReadNotification}
              notification={notification}
            />
          );
        })}
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
        <div className={styles.dot}>
          {notifications.length > 9 ? '9+' : notifications.length}
        </div>
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
