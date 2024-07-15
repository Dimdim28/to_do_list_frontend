import { FC, UIEvent, useDeferredValue, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import userAPI from '../../api/userAPI';
import ROUTES from '../../routes';
import { User } from '../../types/shared';
import Preloader from '../Preloader/Preloader';
import UserImage from '../UserImage/UserImage';

import styles from './SearchUser.module.scss';

interface SearchUserProps {
  handleUserClick: (user: User) => void;
}

const SearchUser: FC<SearchUserProps> = ({ handleUserClick }) => {
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>(
    'success',
  );

  const deferredQuery = useDeferredValue(inputValue);

  async function fetchUsers(userName: string, page: number, reset = false) {
    setStatus('loading');
    if (reset) {
      setUsers([]);
      setCurrentPage(1);
    }
    try {
      const response = await userAPI.getUsers(userName, page);
      setTotalPages(response.totalPages);
      setCurrentPage(response.page);
      if (reset) {
        setUsers(response.users);
      } else {
        setUsers((users) => [...users, ...response.users]);
      }
      setStatus('success');
    } catch (error) {
      setStatus('failed');
    }
  }

  useEffect(() => {
    if (deferredQuery) fetchUsers(inputValue, 1, true);
  }, [deferredQuery]);

  const loadMore = () => {
    const newPage = 1 + currentPage;
    fetchUsers(inputValue, newPage);
  };

  const goToProfile = (id: string) => {
    window.open(`${ROUTES.PROFILE}/${id}`, '_blank');
  };

  const handleUsersScroll = (e: UIEvent<HTMLElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const isScrolled = scrollHeight === scrollTop + clientHeight;
    if (status !== 'loading' && currentPage < totalPages && isScrolled)
      loadMore();
  };

  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{t('searchUser')}</h3>
      <div className={styles.inputLine}>
        <input
          className={styles.input}
          placeholder={t('inputUsername')}
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
        <div className={styles.users} onScroll={handleUsersScroll}>
          {inputValue?.length > 0 &&
            users.map((user) => (
              <div
                className={styles.user}
                key={user._id}
                onClick={() => handleUserClick(user)}
              >
                <UserImage
                  user={user}
                  onAvatarClick={(user) => {
                    goToProfile(user._id);
                  }}
                />
                <div className={styles.userName}>{user.username}</div>
              </div>
            ))}
          {status === 'loading' && <Preloader />}
          {status === 'success' && users.length === 0 && deferredQuery && (
            <p className={styles.noUsers}>{t('noUsers')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
