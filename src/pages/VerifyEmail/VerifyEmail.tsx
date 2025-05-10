import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import instanse from '../../axios';
import Preloader from '../../components/Preloader/Preloader';
import { useAppDispatch } from '../../hooks';
import { fetchAuthMe } from '../../redux/slices/auth/thunk';
import ROUTES from '../../routes';

import styles from './VerifyEmail.module.scss';

const VerifyEmail = () => {
  const { code } = useParams<{ code: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await instanse.post(`/auth/verify-email/${code}`);
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        localStorage.removeItem('emailForVerification');
        await dispatch(fetchAuthMe());
        navigate(ROUTES.HOME);
      } catch (e: any) {
        setError(e?.response?.data?.message || t('verifyInvalid'));
      }
    };

    if (code) verify();
  }, [code, dispatch, navigate, t]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        {error ? t('verifyFailed') : t('verifyTitle')}
      </h1>
      <p className={styles.text}>{error ? error : <Preloader />}</p>
    </div>
  );
};

export default VerifyEmail;
