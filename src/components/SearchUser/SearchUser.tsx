import { FC, useDeferredValue, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import userAPI, { User } from '../../api/userAPI';

import styles from './SearchUser.module.scss';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchUserProps {
  handleUserClick: (user: User) => void;
}

const SearchUser: FC<SearchUserProps> = ({ handleUserClick }) => {
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const deferredQuery = useDeferredValue(inputValue);

  async function fetchUsers(userName: string) {
    const response = await userAPI.getUsers(userName);
    setUsers(response.users);
  }

  useEffect(() => {
    if (deferredQuery) fetchUsers(inputValue);
  }, [deferredQuery]);

  return (
    <div className={styles.content}>
      <h3 className={styles.title}>Search User</h3>
      <div className={styles.inputLine}>
        <input
          className={styles.input}
          placeholder="input username"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <FontAwesomeIcon
          data-testid="search-icon"
          className={styles.searchIcon}
          onClick={(e) => {
            e.stopPropagation();
          }}
          color="black"
          icon={faSearch}
        />
        <div className={styles.users}>
          {inputValue?.length > 0 &&
            users.map((user) => (
              <div
                className={styles.user}
                key={user._id}
                onClick={() => handleUserClick(user)}
              >
                <img
                  className={styles.userAvatar}
                  src={
                    user.avatar?.url ||
                    'https://res.cloudinary.com/dmbythxia/image/upload/v1697126412/samples/animals/cat.jpg'
                  }
                  alt="avatar"
                />
                <div className={styles.userName}>{user.username}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
