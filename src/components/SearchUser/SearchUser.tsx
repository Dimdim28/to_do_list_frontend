import { FC, useDeferredValue, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import userAPI, { User } from '../../api/userAPI';

import styles from './SearchUser.module.scss';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchUserProps {
  callback: () => void;
}

const SearchUser: FC<SearchUserProps> = () => {
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const deferredQuery = useDeferredValue(inputValue);

  async function fetchUsers(userName: string) {
    const response = await userAPI.getUsers(userName);
    console.log(response);
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
              <div className={styles.user} key={user._id}>
                <img
                  className={styles.userAvatar}
                  src={user.avatar?.url}
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
