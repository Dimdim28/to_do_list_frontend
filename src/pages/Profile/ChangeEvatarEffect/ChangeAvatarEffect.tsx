import { useState } from 'react';

import { useAppSelector } from '../../../hooks';
import { selectUserProfile } from '../../../redux/slices/profile/selectors';

import styles from './ChangeAvatarEffect.module.scss';

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
];

export const ChangeAvatarEffect = () => {
  const [activeAvatar, setActiveAvatar] = useState(0);

  const profile = useAppSelector(selectUserProfile) || {
    avatar: null,
  };
  const { avatar } = profile;

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarsList}>
        {avatars.map((el, id) => (
          <div
            key={id}
            className={styles.avatarElement}
            onClick={() => {
              setActiveAvatar(id);
            }}
          >
            <div className={styles.avatar}>
              <img
                src={el.preview}
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
          <img
            src={avatars[activeAvatar]?.animation}
            className={styles.avatarEffect}
            alt="effect"
          />
          {avatar ? (
            <img src={avatar.url} alt="logo" className={styles.avatarImage} />
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

        <div className={styles.button}>Change</div>
      </div>
    </div>
  );
};
