import { useEffect, useState, FC } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Preloader from '../../components/Preloader/Preloader';
import Avatar from './Avatar/Avatar';
import withLoginRedirect from '../../hoc/withLoginRedirect';
import DeleteProfile from './DeleteProfile/DeleteProfile';
import Exit from './Exit/Exit';
import { Modal } from '../../components/common/Modal/Modal';
import { ChangePass } from './ChangePass/ChangePass';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectProfile, selectIsAuth } from '../../redux/slices/auth/selectors';
import { clearProfileErrorMessage } from '../../redux/slices/profile/profile';
import {
  selectProfileMessage,
  selectProfileStatus,
  selectStats,
  selectUserProfile,
} from '../../redux/slices/profile/selectors';
import {
  changeName,
  fetchUserProfile,
  getStats,
} from '../../redux/slices/profile/thunk';
import { chartOptions, getChartData } from '../../helpers/stats';
import { Chart as ChartJS, registerables } from 'chart.js';

import styles from './Profile.module.scss';

import {
  faCheck,
  faPencil,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

ChartJS.register(...registerables);

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isIdShown, setIsIdShown] = useState(false);
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isPassEditing, setIspassEditing] = useState(false);
  const [isAccountDeleting, setIsAccountDeleting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const profile = useAppSelector(selectUserProfile) || {
    username: '',
    avatar: null,
    email: '',
    createdAt: '',
  };
  const { email, username, avatar, createdAt } = profile;
  const date = new Date(createdAt).toLocaleDateString();
  const [name, setName] = useState(username);

  const status = useAppSelector(selectProfileStatus);
  const message = useAppSelector(selectProfileMessage);
  const profileStats = useSelector(selectStats);
  const id = useAppSelector(selectProfile)?._id || '';
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    if (isAuth)
      dispatch(fetchUserProfile({ id })).then(() => {
        dispatch(getStats());
      });
  }, [id, isAuth]);

  useEffect(() => {
    setName(username);
  }, [username]);

  if (status === 'loading') {
    return <Preloader />;
  }

  const showIdHandler = () => {
    if (!isIdShown) {
      setIsIdShown(true);
    } else {
      navigator.clipboard.writeText(id);
      toast.success('Copied to Clipboard');
      setTimeout(() => {
        setIsIdShown(false);
      }, 5000);
    }
  }

  const sumbitChangeName = async () => {
    await dispatch(changeName({ userId: id, username: name }));
    setIsNameEditing(false);
  };

  const cancelChangeName = async () => {
    setIsNameEditing(false);
    setName(username);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.profile}>
        <div className={styles.row}>
          <Avatar />

          <div className={styles.idWrapper} onClick={showIdHandler}>
            {isIdShown ? id : t('showMyId')}
          </div>
          <div className={styles.info}>
            <div className={styles.line}>
              <p className={styles.name}>{t('name')}:</p>
              {isNameEditing ? (
                <>
                  <input
                    className={styles.inputName}
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                  <FontAwesomeIcon
                    onClick={sumbitChangeName}
                    className={styles.check}
                    icon={faCheck}
                  />

                  <FontAwesomeIcon
                    onClick={cancelChangeName}
                    className={styles.close}
                    icon={faX}
                  />
                </>
              ) : (
                <>
                  <p className={styles.text}>{name}</p>
                  <div
                    onClick={() => {
                      dispatch(clearProfileErrorMessage());
                      setIsNameEditing(true);
                    }}
                  >
                    <FontAwesomeIcon
                      className={`${styles.icon} ${styles.pencil}`}
                      onClick={() => {}}
                      color="rgb(163, 163, 163)"
                      fontSize="15px"
                      icon={faPencil}
                    />
                  </div>
                </>
              )}
            </div>

            <div className={styles.line}>
              <p className={styles.name}>{t('email')}:</p>
              <p className={styles.text}>{email}</p>
            </div>

            <div className={styles.line}>
              <p className={styles.name}>{t('registered')}:</p>
              <p className={styles.text}>{date}</p>
            </div>
          </div>

          <div className={styles.buttons}>
            <button
              className={styles.exit}
              onClick={() => {
                dispatch(clearProfileErrorMessage());
                setIsExiting(true);
              }}
            >
              {t('logOut')}
            </button>

            <button
              className={styles.button}
              onClick={() => {
                dispatch(clearProfileErrorMessage());
                setIspassEditing((prev) => !prev);
              }}
            >
              {t('changePassword')}
            </button>

            <button
              className={styles.delete}
              onClick={() => {
                dispatch(clearProfileErrorMessage());
                setIsAccountDeleting(true);
              }}
            >
              {t('deleteAccount')}
            </button>
          </div>

          {isAccountDeleting && (
            <Modal
              active={isAccountDeleting}
              setActive={setIsAccountDeleting}
              ChildComponent={DeleteProfile}
              childProps={{ toggleActive: setIsAccountDeleting }}
            />
          )}
          {isExiting && (
            <Modal
              active={isExiting}
              setActive={setIsExiting}
              ChildComponent={Exit}
              childProps={{ toggleActive: setIsExiting }}
            />
          )}
        </div>

        {isPassEditing && (
          <div className={styles.passwordWrapper}>
            <div className={styles.passEditing}>
              <ChangePass id={id} />
            </div>
          </div>
        )}
        {status === 'error' && <p className={styles.error}>{message}</p>}
      </div>
      {profileStats.length > 0 && (
        <div className={styles.chartWrapper}>
          <Bar data={getChartData(profileStats)} options={chartOptions} />
        </div>
      )}
    </main>
  );
};

export default withLoginRedirect(Profile);
