import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from '../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeLang, changeTheme } from '../../redux/slices/auth/auth';
import {
  selectIsAuth,
  selectLanguage,
  selectNeedsEmailVerification,
  selectTheme,
} from '../../redux/slices/auth/selectors';
import ROUTES from '../../routes';
import { Language, Theme } from '../../types/shared';

import Notifications from './Notifications/Notifications';

import styles from './Header.module.scss';

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
  const needsEmailVerification = useAppSelector(selectNeedsEmailVerification);

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
        {isAuthorized && !needsEmailVerification && <Notifications />}
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
