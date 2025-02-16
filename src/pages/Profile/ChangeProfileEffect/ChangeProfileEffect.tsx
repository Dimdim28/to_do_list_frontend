import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import userAPI from '../../../api/userAPI';
import Preloader from '../../../components/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { updateProfileEffect } from '../../../redux/slices/profile/profile';
import { selectUserProfile } from '../../../redux/slices/profile/selectors';
import { ProfileEffect, Status } from '../../../types/shared';

import styles from './ChangeProfileEffect.module.scss';

interface ChangeAvatarEffectProps {
  childProps: {
    toggleActive: (value: boolean) => void;
    isActive: boolean;
  };
}

export const ChangeProfileEffect: FC<ChangeAvatarEffectProps> = ({
  childProps,
}) => {
  const { toggleActive, isActive } = childProps;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectUserProfile);

  const [allEffects, setAllEffects] = useState<ProfileEffect[]>([]);
  const [activeAvatar, setActiveAvatar] = useState<string | null>(
    profile?.profileEffect?._id || null,
  );
  const [hoveredAvatar, setHoveredAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!activeAvatar) return;

    setIsLoading(true);
    const res = await userAPI.updateUserProfileEffect(activeAvatar);

    if (res.status === Status.ERROR) {
      setError(res.message);
      return;
    }

    setError('');
    setIsLoading(false);
    if (res.newEffect?.profileEffect) {
      dispatch(updateProfileEffect(res.newEffect.profileEffect));
    }

    toggleActive(false);
  };

  const handleCancel = () => {
    toggleActive(false);
  };

  useEffect(() => {
    if (!isActive) return;

    async function getProfileEffects() {
      setIsLoading(true);
      const data = await userAPI.getAllProfileEffects();

      if (data.effects) {
        setAllEffects(data.effects);
      }

      if (data.status === Status.ERROR) {
        setError(data.message || 'error');
      }
      setError('');
      setIsLoading(false);
    }
    getProfileEffects();
  }, [isActive, profile?._id]);

  function getAvatarState(
    hoveredAvatar: string | null,
    activeAvatar: string | null,
    id: string,
    el: ProfileEffect,
  ) {
    if (hoveredAvatar === id) {
      return el.sides;
    } else if (id === activeAvatar) {
      return el.intro || el.sides;
    } else {
      return el.preview;
    }
  }

  if (isLoading) {
    return <Preloader />;
  }

  const activeProfileEffect = allEffects.find((el) => el._id === activeAvatar);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <h2 className={styles.title}>{t('changeProfileEffect')}</h2>
          <div className={styles.content}>
            <div className={styles.avatarsList}>
              <div
                className={`${styles.avatarElement} ${
                  '' === activeAvatar ? styles.activeAvatar : ''
                }`}
                onClick={() => {
                  setActiveAvatar('');
                }}
                onMouseEnter={() => setHoveredAvatar(null)}
                onMouseLeave={() => setHoveredAvatar(null)}
              >
                <div className={styles.avatar}>
                  <svg
                    className={styles.emptyEffect}
                    aria-hidden="true"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M23 12a11 11 0 1 1-22 0 11 11 0 0 1 22 0Zm-2 0a9 9 0 0 1-14.62 7.03L19.03 6.38A8.96 8.96 0 0 1 21 12ZM4.97 17.62 17.62 4.97A9 9 0 0 0 4.97 17.62Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              {allEffects.map((el, id) => (
                <div
                  key={id}
                  className={`${styles.avatarElement} ${
                    el._id === activeAvatar ? styles.activeAvatar : ''
                  }  ${hoveredAvatar === el._id ? styles.hoveredAvatar : ''}`}
                  onClick={() => {
                    setActiveAvatar(el._id);
                  }}
                  onMouseEnter={() => setHoveredAvatar(el._id)}
                  onMouseLeave={() => setHoveredAvatar(null)}
                >
                  <div className={styles.avatar}>
                    <img
                      src={getAvatarState(
                        hoveredAvatar,
                        activeAvatar,
                        el._id,
                        el,
                      )}
                      className={`${styles.avatarEffect}`}
                      alt="effect"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.column}>
              <div className={styles.row}>
                <div className={styles.effectPreview}>
                  {!!activeAvatar && (
                    <img
                      src={
                        activeProfileEffect?.intro || activeProfileEffect?.sides
                      }
                      className={styles.avatarEffect}
                      alt="effect"
                    />
                  )}
                </div>
                <div className={styles.effectPreview}>
                  {!!activeAvatar && (
                    <img
                      src={activeProfileEffect?.sides}
                      className={styles.avatarEffect}
                      alt="effect"
                    />
                  )}
                </div>
              </div>
              <div className={styles.effectTitle}>
                {activeProfileEffect?.title}
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.cancel} onClick={handleCancel}>
              {t('cancel')}
            </button>
            <button className={styles.accept} onClick={handleSubmit}>
              {t('submit')}
            </button>
          </div>

          {error && <p className={styles.error}>{error}</p>}
        </>
      )}
    </div>
  );
};
