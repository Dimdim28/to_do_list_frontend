import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectIsAuth,
  selectLanguage,
  selectTheme,
} from '../../redux/slices/auth/selectors';
import ROUTES from '../../routes';
import Notifications from './Notifications/Notifications';
import { Language, Theme } from '../../types';
import { changeLang, changeTheme } from '../../redux/slices/auth/auth';

import styles from './Header.module.scss';

import logo from '../../assets/logo.png';

export type Link = {
  path: ROUTES;
  name: string;
};

interface HeaderProps {
  links: Link[];
}

const Header: FC<HeaderProps> = ({ links }) => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const theme = useAppSelector(selectTheme);
  const language = useAppSelector(selectLanguage);
  const isAuthorized = useAppSelector(selectIsAuth);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    localStorage.setItem('theme', newTheme);
    dispatch(changeTheme(newTheme));
  };

  const togglelang = (language: Language) => {
    const getNewLanguage = (): Language => {
      if (language === Language.EN) return Language.UA;
      if (language === Language.UA) return Language.EN;
      return Language.EN;
    };
    const newLanguage = getNewLanguage();
    i18n.changeLanguage(newLanguage);
    dispatch(changeLang(newLanguage));
  };

  return (
    <header>
      <div className={styles.actionsWrapper}>
        <img className={styles.logo} alt="logo" src={logo} />
        {isAuthorized && <Notifications />}
        <FontAwesomeIcon
          onClick={toggleTheme}
          data-testid="theme-icon"
          icon={theme === Theme.DARK ? faSun : faMoon}
          className={styles.themeIcon}
        />
        <button
          className={styles.language}
          onClick={() => {
            togglelang(language);
          }}
          data-testid="lang-icon"
        >
          {i18n.language}
        </button>
      </div>

      <nav>
        {links.map(({ path, name }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              isActive ? styles.isActive : undefined
            }
          >
            {t(name)}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
