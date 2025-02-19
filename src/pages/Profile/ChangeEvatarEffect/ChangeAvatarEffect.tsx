import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import userAPI from '../../../api/userAPI';
import Preloader from '../../../components/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { updateUserAvatarEffect } from '../../../redux/slices/profile/profile';
import { selectUserProfile } from '../../../redux/slices/profile/selectors';
import { AvatarEffect, Status } from '../../../types/shared';

import styles from './ChangeAvatarEffect.module.scss';

const NO_EFFECT_ID = '67b6313b21b180db433ee042';

interface ChangeAvatarEffectProps {
  childProps: {
    isActive: boolean;
    toggleActive: (value: boolean) => void;
  };
}

export const ChangeAvatarEffect: FC<ChangeAvatarEffectProps> = ({
  childProps,
}) => {
  const { toggleActive, isActive } = childProps;

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectUserProfile);

  const [allEffects, setAllEffects] = useState<AvatarEffect[]>([]);
  const [activeAvatar, setActiveAvatar] = useState<string>(
    profile?.avatarEffect?._id || NO_EFFECT_ID,
  );
  const [hoveredAvatar, setHoveredAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!activeAvatar) return;

    setIsLoading(true);
    const res = await userAPI.updateUserAvatarEffect(activeAvatar);

    if (res.status === Status.ERROR) {
      setError(res.message);
      return;
    }

    setError('');
    setIsLoading(false);
    if (res.newEffect?.avatarEffect) {
      dispatch(updateUserAvatarEffect(res.newEffect.avatarEffect));
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
      const data = await userAPI.getAllUserAvatarEffects();

      if (data.effects) {
        setAllEffects(data.effects.filter((el) => el._id !== NO_EFFECT_ID));
      }

      if (data.status === Status.ERROR) {
        setError(data.message || 'error');
      }
      setError('');
      setIsLoading(false);
    }
    getProfileEffects();
  }, [isActive, profile?._id]);

  const avatarEffect = allEffects.find((el) => el._id === activeAvatar);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <h2 className={styles.title}>{t('changeAvatarEffect')}</h2>
          <div className={styles.content}>
            <div className={styles.avatarsList}>
              <div
                className={`${styles.avatarElement} ${
                  NO_EFFECT_ID === activeAvatar ? styles.activeAvatar : ''
                }`}
                onClick={() => {
                  setActiveAvatar(NO_EFFECT_ID);
                }}
                onMouseEnter={() => setHoveredAvatar(null)}
                onMouseLeave={() => setHoveredAvatar(null)}
              >
                <div className={styles.avatar}>
                  {profile?.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="logo"
                      className={styles.avatarImage}
                    />
                  ) : (
                    <img
                      className={styles.avatarImage}
                      src={
                        'https://res.cloudinary.com/dmbythxia/image/upload/v1697126412/samples/animals/cat.jpg'
                      }
                      alt="default"
                    />
                  )}
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
                  }`}
                  onClick={() => {
                    setActiveAvatar(el._id);
                  }}
                  onMouseEnter={() => setHoveredAvatar(el._id)}
                  onMouseLeave={() => setHoveredAvatar(null)}
                >
                  <div className={styles.avatar}>
                    <img
                      src={hoveredAvatar === el._id ? el.animated : el.preview}
                      className={styles.avatarEffect}
                      alt="effect"
                    />
                    {profile?.avatar ? (
                      <img
                        src={profile.avatar}
                        alt="logo"
                        className={styles.avatarImage}
                      />
                    ) : (
                      <img
                        className={styles.avatarImage}
                        src={
                          'https://res.cloudinary.com/dmbythxia/image/upload/v1697126412/samples/animals/cat.jpg'
                        }
                        alt="default"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.effectPreview}>
              <div className={styles.avatar}>
                {activeAvatar !== NO_EFFECT_ID && (
                  <img
                    src={avatarEffect?.animated}
                    className={styles.avatarEffect}
                    alt="effect"
                  />
                )}
                {profile?.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="logo"
                    className={`${styles.avatarImage} ${
                      activeAvatar !== NO_EFFECT_ID ? styles.border : ''
                    }`}
                  />
                ) : (
                  <img
                    className={`${styles.avatarImage} ${
                      activeAvatar !== NO_EFFECT_ID ? styles.border : ''
                    }`}
                    src={
                      'https://res.cloudinary.com/dmbythxia/image/upload/v1697126412/samples/animals/cat.jpg'
                    }
                    alt="default"
                  />
                )}
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
