import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ChangeAvatarEffect.module.scss';
import { useAppSelector } from '../../../hooks';
import { selectUserProfile } from '../../../redux/slices/profile/selectors';

const avatars = [
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_c9b84ee80a335a9d59b69352e34574f6.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_c9b84ee80a335a9d59b69352e34574f6.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_6fdbddb6229453eac3bbb212edf5cd1c.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_6fdbddb6229453eac3bbb212edf5cd1c.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_9a6bf0ab30a6719d6eb09fa4996984ca.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_9a6bf0ab30a6719d6eb09fa4996984ca.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_8552f9857793aed0cf816f370e2df3be.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_8552f9857793aed0cf816f370e2df3be.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_6d16b27d9415cafe3b289053644337c4.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_6d16b27d9415cafe3b289053644337c4.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_a47890109a231f72dae7b17b27164676.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_a47890109a231f72dae7b17b27164676.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_5873ecaa76fb549654b40095293f902e.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_5873ecaa76fb549654b40095293f902e.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_bb71042ccd2ca277a69f086a4f3354d0.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_bb71042ccd2ca277a69f086a4f3354d0.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_e8c11f139e55dac538cdaafb3caa2317.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_e8c11f139e55dac538cdaafb3caa2317.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_f740031cc97d1b7eb73c0d0ac1dd09f3.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_f740031cc97d1b7eb73c0d0ac1dd09f3.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_77b7b6a740a9451e1ef39c0252154ef8.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_77b7b6a740a9451e1ef39c0252154ef8.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_49c479e15533fb4c02eb320c9c137433.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_49c479e15533fb4c02eb320c9c137433.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_4cc97277177b166fd7d4af3bdb370815.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_4cc97277177b166fd7d4af3bdb370815.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_a0db4314b8cc271c8f472357aa895005.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_a0db4314b8cc271c8f472357aa895005.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_51d3bb502109eec26c76386ec980bc8b.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_51d3bb502109eec26c76386ec980bc8b.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_3e1fc3c7ee2e34e8176f4737427e8f4f.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_3e1fc3c7ee2e34e8176f4737427e8f4f.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_f3af281c65cf0cf590e9e1f59e9c6cf6.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_f3af281c65cf0cf590e9e1f59e9c6cf6.png?size=240&passthrough=false',
  },
  {
    animation:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_c3cffc19e9784f7d0b005eecdf1b566e.png?size=240&passthrough=true',
    preview:
      'https://cdn.discordapp.com/avatar-decoration-presets/a_c3cffc19e9784f7d0b005eecdf1b566e.png?size=240&passthrough=false',
  },
];

interface ChangeAvatarEffectProps {
  childProps: {
    toggleActive: (value: boolean) => void;
  };
}

export const ChangeAvatarEffect: FC<ChangeAvatarEffectProps> = ({
  childProps,
}) => {
  const { toggleActive } = childProps;
  const { t } = useTranslation();

  const [activeAvatar, setActiveAvatar] = useState<number>(-1);
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);

  const profile = useAppSelector(selectUserProfile) || {
    avatar: null,
  };
  const { avatar } = profile;

  const handleSubmit = () => {
    toggleActive(false);
  };

  const handleCancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t('changeAvatarEffect')}</h2>
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
              {avatar ? (
                <img
                  src={avatar.url}
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
          {avatars.map((el, id) => (
            <div
              key={id}
              className={`${styles.avatarElement} ${
                id === activeAvatar ? styles.activeAvatar : ''
              }`}
              onClick={() => {
                setActiveAvatar(id);
              }}
              onMouseEnter={() => setHoveredAvatar(id)}
              onMouseLeave={() => setHoveredAvatar(null)}
            >
              <div className={styles.avatar}>
                <img
                  src={hoveredAvatar === id ? el.animation : el.preview}
                  className={styles.avatarEffect}
                  alt="effect"
                />
                {avatar ? (
                  <img
                    src={avatar.url}
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
            {activeAvatar > -1 && (
              <img
                src={avatars[activeAvatar]?.animation}
                className={styles.avatarEffect}
                alt="effect"
              />
            )}
            {avatar ? (
              <img
                src={avatar.url}
                alt="logo"
                className={`${styles.avatarImage} ${
                  activeAvatar < 0 ? styles.border : ''
                }`}
              />
            ) : (
              <img
                className={`${styles.avatarImage} ${
                  activeAvatar < 0 ? styles.border : ''
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
    </div>
  );
};
