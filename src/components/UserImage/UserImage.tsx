import { FC } from 'react';

import { User } from '../../api/userAPI';

import styles from './UserImage.module.scss';

type Size = 'medium' | 'large';

interface UserImageProps {
  user: User;
  size?: Size;
}

const UserImage: FC<UserImageProps> = ({ user, size = 'medium' }) => {
  return (
    <div>
      <img
        className={`${styles.userImage} ${
          size === 'medium' ? styles.medium : styles.large
        }`}
        src={
          user?.avatar?.url ||
          'https://res.cloudinary.com/dmbythxia/image/upload/v1697126412/samples/animals/cat.jpg'
        }
        alt={user.username}
      />
    </div>
  );
};

export default UserImage;
