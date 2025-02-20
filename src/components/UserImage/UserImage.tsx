import { FC } from 'react';

import { User } from '../../types/shared';

import styles from './UserImage.module.scss';

type Size = 'medium' | 'large';

interface UserImageProps {
  user: User;
  size?: Size;
  additionalClassname?: string;
  onAvatarClick?: (user: User) => void;
}

const UserImage: FC<UserImageProps> = ({
  user,
  size = 'medium',
  additionalClassname,
  onAvatarClick,
}) => {
  console.log(user);

  return (
    <div
      className={`${styles.userImageWrapper} ${
        size === 'medium' ? styles.medium : styles.large
      } ${additionalClassname ?? ''}`}
    >
      <img
        onClick={(e) => {
          if (onAvatarClick) {
            e.stopPropagation();
            onAvatarClick(user);
          }
        }}
        className={`${styles.avatarImage} ${
          onAvatarClick ? styles.clickable : ''
        }`}
        src={
          user?.avatar ||
          'https://res.cloudinary.com/dmbythxia/image/upload/v1697126412/samples/animals/cat.jpg'
        }
        alt={user?.username || 'User'}
      />
      {user.avatarEffect ? (
        <img
          src={user.avatarEffect.animated}
          className={styles.avatarEffect}
          alt="effect"
        />
      ) : null}
    </div>
  );
};

export default UserImage;
