import { lazy, useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import i18next from 'i18next';

import { Link } from './components/Header/Header';
import AuthLayout from './layouts/AuthLayout';
import FAQLayout from './layouts/FAQLayout';
import HomeLayout from './layouts/HomeLayout';
import PageLayout from './layouts/PageLayout';
import { selectTheme } from './redux/slices/auth/selectors';
import { fetchAuthMe } from './redux/slices/auth/thunk';
import { Language } from './types/shared';
import { useAppDispatch, useAppSelector } from './hooks';
import TRANSLATIONS from './lang';
import ROUTES from './routes';

import './styles/reset.scss';
import './styles/typography.scss';
import './styles/global-styles.scss';
import 'react-toastify/dist/ReactToastify.css';

const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Home = lazy(() => import('./pages/Home/Home'));
const FAQ = lazy(() => import('./pages/FAQ/FAQ'));
const Board = lazy(() => import('./pages/Board/Board'));

i18next.use(initReactI18next).init({
  lng: localStorage.getItem('lang') || Language.EN,
  debug: true,
  resources: TRANSLATIONS,
  fallbackLng: 'en',
});

export const HEADER_LINKS: Link[] = [
  {
    path: ROUTES.PROFILE,
    name: 'profile',
  },
  {
    path: ROUTES.HOME,
    name: 'home',
  },
  {
    path: ROUTES.BOARD,
    name: 'board',
  },
];

export const FOOTER_LINKS: Link[] = [
  {
    path: ROUTES.FAQ,
    name: 'faq',
  },
];

function App() {
  const dispatch = useAppDispatch();

  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };

  window.onload = function () {
    appHeight();
  };

  useEffect(() => {
    window.addEventListener('resize', appHeight);
    window.addEventListener('load', appHeight);
    appHeight();
  }, []);

  const theme = useAppSelector(selectTheme);
  document.documentElement.className = `${theme}_theme`;

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path={ROUTES.AUTH} element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
          </Route>
          <Route path="" element={<HomeLayout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.FAQ} element={<FAQ />} />
            <Route path={ROUTES.BOARD} element={<Board />} />
          </Route>
          <Route path="" element={<PageLayout />}>
            <Route path={`${ROUTES.PROFILE}/:id`} element={<Profile />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
          </Route>
          <Route path="" element={<FAQLayout />}>
            <Route path={ROUTES.FAQ} element={<FAQ />} />
          </Route>
          <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
