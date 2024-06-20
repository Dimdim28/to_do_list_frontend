import {
  Dispatch,
  FC,
  SetStateAction,
  useDeferredValue,
  useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SearchTask.module.scss';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchTaskProps {
  value: string;
  changeValue: Dispatch<SetStateAction<string>>;
  callback: (value: string) => void;
}

export const SearchTask: FC<SearchTaskProps> = ({
  value,
  changeValue,
  callback,
}) => {
  const { t } = useTranslation();

  const deferredQuery = useDeferredValue(value);

  useEffect(() => {
    if (deferredQuery) callback(deferredQuery);
  }, [deferredQuery]);

  return (
    <div
      className={`${value.length > 0 ? styles.active : ''} ${styles.inputLine}`}
    >
      <input
        className={styles.input}
        placeholder={t('inputTaskTitle')}
        type="text"
        value={value}
        onChange={(e) => changeValue(e.target.value)}
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
    </div>
  );
};
