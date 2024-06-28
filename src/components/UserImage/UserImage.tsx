import { FC, useEffect, useState } from 'react';

import { User } from '../../api/userAPI';

import styles from './UserImage.module.scss';
import { avatarsEffectsList } from '../../pages/Profile/ChangeEvatarEffect/ChangeAvatarEffect';

type Size = 'medium' | 'large';

interface UserImageProps {
  user: User;
  size?: Size;
  additionalClassname?: string;
}

const UserImage: FC<UserImageProps> = ({
  user,
  size = 'medium',
  additionalClassname,
}) => {
  const [effectUrl, setEffectUrl] = useState(avatarsEffectsList[0].animation);

  useEffect(() => {
    const avatarEffect = (
      avatarsEffectsList[
        Math.floor(Math.random() * avatarsEffectsList.length)
      ] || avatarsEffectsList[0]
    ).animation;
    setEffectUrl(avatarEffect);
  }, []);

  return (
    <div
      className={`${styles.userImageWrapper} ${
        size === 'medium' ? styles.medium : styles.large
      } ${additionalClassname ?? ''}`}
    >
      <img
        className={styles.avatarImage}
        src={
          user?.avatar?.url ||
          'https://res.cloudinary.com/dmbythxia/image/upload/v1697126412/samples/animals/cat.jpg'
        }
        alt={user?.username || 'User'}
      />
      <img src={effectUrl} className={styles.avatarEffect} alt="effect" />
    </div>
  );
};

export default UserImage;
