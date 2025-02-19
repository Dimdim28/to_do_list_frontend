import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Chart as ChartJS, registerables } from 'chart.js';

import { Modal } from '../../components/common/Modal/Modal';
import Preloader from '../../components/Preloader/Preloader';
import { chartOptions, getChartData } from '../../helpers/stats';
import withLoginRedirect from '../../hoc/withLoginRedirect';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectIsAuth, selectProfile } from '../../redux/slices/auth/selectors';
import {
  selectProfileMessage,
  selectProfileStatus,
  selectStats,
  selectUserProfile,
} from '../../redux/slices/profile/selectors';
import { fetchUserProfile, getStats } from '../../redux/slices/profile/thunk';

import { ChangeAvatarEffect } from './ChangeEvatarEffect/ChangeAvatarEffect';
import { ChangePass } from './ChangePass/ChangePass';
import { ChangeProfileEffect } from './ChangeProfileEffect/ChangeProfileEffect';
import Buttons from './ProfileCard/Buttons/Buttons';
import ProfileCard from './ProfileCard/ProfileCard';

import styles from './Profile.module.scss';

ChartJS.register(...registerables);

const Profile = () => {
  const dispatch = useAppDispatch();
  const { id = '' } = useParams();

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isPassEditing, setIspassEditing] = useState(false);
  const [isAccountDeleting, setIsAccountDeleting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isEffectModalOpened, setIsEffectModalOpened] = useState(false);
  const [isProfileEffectModalOpened, setIsProfileEffectModalOpened] =
    useState(false);

  const profile = useAppSelector(selectUserProfile) || {
    username: '',
  };
  const { username } = profile;
  const [name, setName] = useState(username);

  const status = useAppSelector(selectProfileStatus);
  const message = useAppSelector(selectProfileMessage);
  const profileStats = useSelector(selectStats);
  const ownerId = useAppSelector(selectProfile)?._id || '';
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    if (isAuth)
      dispatch(fetchUserProfile({ id: id })).then(() => {
        dispatch(getStats());
      });
  }, [id, isAuth]);

  useEffect(() => {
    setName(username);
  }, [username]);

  if (status === 'loading') {
    return <Preloader />;
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.profile}>
        <ProfileCard
          isNameEditing={isNameEditing}
          setIsNameEditing={setIsNameEditing}
          name={name}
          setName={setName}
          id={id}
          setIsExiting={setIsExiting}
          setIsAccountDeleting={setIsAccountDeleting}
          isAccountDeleting={isAccountDeleting}
          isExiting={isExiting}
          ownerId={ownerId}
        />

        <div className={styles.column}>
          {profileStats.length > 0 && (
            <>
              {(!id || id === ownerId) && (
                <div className={styles.chartWrapper}>
                  <Bar
                    data={getChartData(profileStats)}
                    options={chartOptions}
                  />
                </div>
              )}
            </>
          )}

          {(!id || id === ownerId) && (
            <Buttons
              setIsExiting={setIsExiting}
              setIspassEditing={setIspassEditing}
              setIsAccountDeleting={setIsAccountDeleting}
              setIsEffectModalOpened={setIsEffectModalOpened}
              setIsProfileEffectModalOpened={setIsProfileEffectModalOpened}
            />
          )}
        </div>
      </div>

      {isPassEditing && (!id || id === ownerId) && (
        <div className={styles.passwordWrapper}>
          <div className={styles.passEditing}>
            <ChangePass id={id} />
          </div>
        </div>
      )}
      {status === 'error' && <p className={styles.error}>{message}</p>}

      <Modal
        active={isEffectModalOpened}
        setActive={setIsEffectModalOpened}
        ChildComponent={ChangeAvatarEffect}
        childProps={{
          toggleActive: setIsEffectModalOpened,
          isActive: isEffectModalOpened,
        }}
      />

      <Modal
        active={isProfileEffectModalOpened}
        setActive={setIsProfileEffectModalOpened}
        ChildComponent={ChangeProfileEffect}
        childProps={{
          toggleActive: setIsProfileEffectModalOpened,
          isActive: isProfileEffectModalOpened,
        }}
      />
    </main>
  );
};

export default withLoginRedirect(Profile);
