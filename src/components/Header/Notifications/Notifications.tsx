import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Notifications.module.scss';
import notificationsAPI, { Notification } from '../../../api/notificationsApi';
import Preloader from '../../Preloader/Preloader';

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  function toggleNotifications() {
    setIsNotificationsOpen((prev) => !prev);
  }

  useEffect(() => {
    async function getNotifications() {
      const notifications = await notificationsAPI.getNotifications();
      const notificationsList = notifications.notifications;
      const errorMessage = notifications.message;

      if (errorMessage) {
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage('');
      }

      if (notificationsList && !errorMessage)
        setNotifications(notificationsList);
    }
    getNotifications();
  }, []);

  return (
    <div className={styles.wrapper}>
      <FontAwesomeIcon
        icon={faBell}
        className={styles.bell}
        onClick={toggleNotifications}
      />

      {!errorMessage && notifications.length === 0 ? (
        <Preloader />
      ) : (
        isNotificationsOpen && (
          <div className={styles.notificationsList}>
            {notifications.map((notification) => (
              <div key={notification._id} className={styles.notification}>
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
                      {notification.userId.username} sent you a task
                    </p>

                    <div className={styles.buttons}>
                      <button className={styles.accept}>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={styles.acceptIcon}
                        />
                      </button>
                      <button className={styles.decline}>
                        <FontAwesomeIcon
                          icon={faXmark}
                          className={styles.declineIcon}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Notifications;
