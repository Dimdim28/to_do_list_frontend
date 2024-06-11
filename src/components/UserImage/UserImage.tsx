import { FC } from 'react';

import { User } from '../../api/userAPI';

import styles from './UserImage.module.scss';

import avatarEffect from '../../assets/32animated.png';

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
      <img src={avatarEffect} className={styles.avatarEffect} alt="effect" />
    </div>
  );
};

export default UserImage;
