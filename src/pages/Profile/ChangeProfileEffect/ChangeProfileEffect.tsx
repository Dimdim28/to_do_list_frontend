import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../hooks';
import { selectUserProfile } from '../../../redux/slices/profile/selectors';

import styles from './ChangeProfileEffect.module.scss';

interface ChangeAvatarEffectProps {
  childProps: {
    toggleActive: (value: boolean) => void;
  };
}

export const ChangeProfileEffect: FC<ChangeAvatarEffectProps> = ({
  childProps,
}) => {
  const { toggleActive } = childProps;
  const { t } = useTranslation();

  const [activeAvatar, setActiveAvatar] = useState<number>(-1);
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);

  const profile = useAppSelector(selectUserProfile) || {
    avatar: null,
  };
  // const { avatar } = profile;

  const handleSubmit = () => {
    toggleActive(false);
  };

  const handleCancel = () => {
    toggleActive(false);
  };

  const profileEffect = [
    {
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732560276/profileeffects/25/25i.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732560327/profileeffects/25/25p.png',
      loop: 'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732560351/profileeffects/25/25s.png',
    },
    {
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732560159/profileeffects/24/24i.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732560188/profileeffects/24/24p.png',
      loop: 'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732560228/profileeffects/24/24s.png',
    },
    {
      loop: 'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732560001/profileeffects/23/23i.png',
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732560063/profileeffects/23/23p.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732560085/profileeffects/23/23s.png',
    },
    {
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732559823/profileeffects/22/22i.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732559942/profileeffects/22/22p.png',
      loop: ' https://res.cloudinary.com/dd9cqzqma/image/upload/v1732559962/profileeffects/22/22s.png',
    },
    {
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553312/profileeffects/10/10i.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553347/profileeffects/10/10p.png',
      loop: 'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553393/profileeffects/10/10s.png',
    },
    {
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553416/profileeffects/11/11i.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553439/profileeffects/11/11p.png',
      loop: 'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553471/profileeffects/11/11s.png',
    },
    {
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553508/profileeffects/12/12i.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553547/profileeffects/12/12p.png',
      loop: 'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553569/profileeffects/12/12s.png',
    },
    {
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553664/profileeffects/13/13i.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553688/profileeffects/13/13p.png',
      loop: 'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553706/profileeffects/13/13s.png',
    },
    {
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553742/profileeffects/14/14i.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553801/profileeffects/14/14p.png',
      loop: 'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553839/profileeffects/14/14s.png',
    },
    {
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732553936/profileeffects/15/15i.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732556064/profileeffects/15/15p.png',
      loop: 'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732558586/profileeffects/15/15s.png',
    },
    {
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732558726/profileeffects/16/16i.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732558758/profileeffects/16/16p.png',
      loop: 'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732558810/profileeffects/16/16s.png',
    },
    {
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732558843/profileeffects/17/17i.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732558885/profileeffects/17/17p.png',
      loop: 'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732558933/profileeffects/17/17s.png',
    },
    {
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732558994/profileeffects/18/18i.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732559030/profileeffects/18/18p.png',
      loop: 'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732559062/profileeffects/18/18s.png',
    },
    {
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732559109/profileeffects/19/19i.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732559153/profileeffects/19/19p.png',
      loop: 'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732559179/profileeffects/19/19s.png',
    },
    {
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732559586/profileeffects/20/20i.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732559665/profileeffects/20/20p.png',
      loop: 'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732559690/profileeffects/20/20s.png',
    },
    {
      intro:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732559721/profileeffects/21/21i.png',
      preview:
        'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732559747/profileeffects/21/21p.png',
      loop: 'https://res.cloudinary.com/dd9cqzqma/image/upload/v1732559778/profileeffects/21/21s.png',
    },
  ];

  function getAvatarState(
    hoveredAvatar: number | null,
    activeAvatar: number,
    id: number,
    el: any,
  ) {
    if (hoveredAvatar === id) {
      return el.loop;
    } else if (id === activeAvatar) {
      return el.intro;
    } else {
      return el.preview;
    }
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t('changeProfileEffect')}</h2>
      <div className={styles.content}>
        <div className={styles.avatarsList}>
          <div
            className={`${styles.avatarElement} ${
              -1 === activeAvatar ? styles.activeAvatar : ''
            }`}
            onClick={() => {
              setActiveAvatar(-1);
            }}
            onMouseEnter={() => setHoveredAvatar(-1)}
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
          {profileEffect.map((el, id) => (
            <div
              key={id}
              className={`${styles.avatarElement} ${
                id === activeAvatar ? styles.activeAvatar : ''
              }  ${hoveredAvatar === id ? styles.hoveredAvatar : ''}`}
              onClick={() => {
                setActiveAvatar(id);
              }}
              onMouseEnter={() => setHoveredAvatar(id)}
              onMouseLeave={() => setHoveredAvatar(null)}
            >
              <div className={styles.avatar}>
                <img
                  src={getAvatarState(hoveredAvatar, activeAvatar, id, el)}
                  className={`${styles.avatarEffect}`}
                  alt="effect"
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.effectPreview}>
          {activeAvatar > -1 && (
            <img
              src={profileEffect[activeAvatar]?.intro}
              className={styles.avatarEffect}
              alt="effect"
            />
          )}
        </div>
        <div className={styles.effectPreview}>
          {activeAvatar > -1 && (
            <img
              src={profileEffect[activeAvatar]?.loop}
              className={styles.avatarEffect}
              alt="effect"
            />
          )}
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
    </div>
  );
};
