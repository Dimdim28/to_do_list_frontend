import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';

import socketsAPI from '../../api/socketsAPI';
import { FormikInput } from '../../components/common/Input/Input';
import GoogleLogin from '../../components/GoogleLogin';
import withHomeRedirect from '../../hoc/withHomeRedirect';
import { useAppDispatch } from '../../hooks';
import { fetchUserData } from '../../redux/slices/auth/thunk';
import ROUTES from '../../routes';

import { validate } from './helpers';

import styles from './Login.module.scss';

const Login: FC = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      const data: any = await dispatch(fetchUserData(values));
      if (data.error) setError(data.payload);
      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
        socketsAPI.init(data.payload.token);
      }
      formik.resetForm();
      setSubmitting(false);
    },
  });

  return (
    <main>
      <div className={styles.wrapper}>
        <h1>{t('signInBold')}</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.fieldsWrapper}>
            <FormikInput
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              title={t('email')}
            />
            {formik.errors.email && formik.touched.email ? (
              <p>{formik.errors.email}</p>
            ) : null}
          </div>

          <div className={styles.fieldsWrapper}>
            <FormikInput
              name="password"
              type="password"
              title={t('password')}
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <p>{formik.errors.password}</p>
            ) : null}
          </div>

          <div className={styles.buttonsWrapper}>
            <button
              disabled={
                formik.isSubmitting || Object.keys(formik.errors).length > 0
              }
              type="submit"
            >
              {t('signIn')}
            </button>
            <NavLink
              className={styles.link}
              to={`${ROUTES.AUTH}/${ROUTES.REGISTER}`}
            >
              {t('signUp')}
            </NavLink>
          </div>
        </form>
        <GoogleLogin setError={setError} />
        {error ? <p className={styles.error}>{error}</p> : null}
      </div>
    </main>
  );
};

export default withHomeRedirect(Login);
