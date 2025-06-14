import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';

import socketsAPI from '../../api/socketsAPI';
import { FormikInput } from '../../components/common/Input/Input';
import GoogleLogin from '../../components/GoogleLogin';
import withHomeRedirect from '../../hoc/withHomeRedirect';
import { useAppDispatch } from '../../hooks';
import { registerUser } from '../../redux/slices/auth/thunk';
import ROUTES from '../../routes';

import styles from './Register.module.scss';

interface Values {
  email?: string;
  username?: string;
  firstPass?: string;
  secondPass?: string;
}

export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const validate = (values: Values) => {
  const errors: Values = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length < 3) {
    errors.username = 'Must be 3 characters or more';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }

  if (!values.firstPass) {
    errors.firstPass = 'Required';
  } else if (!PASSWORD_REGEX.test(values.firstPass)) {
    errors.firstPass =
      'Password must contain at least 8 characters, including a number, a capital letter, and a symbol';
  }

  if (!values.secondPass) {
    errors.secondPass = 'Required';
  } else if (!PASSWORD_REGEX.test(values.secondPass)) {
    errors.secondPass =
      'Password must contain at least 8 characters, including a number, a capital letter, and a symbol';
  } else if (values.firstPass !== values.secondPass) {
    errors.secondPass = 'Passwords must match';
  }

  if (values.firstPass !== values.secondPass) {
    errors.secondPass = 'Passwords are not the same';
  }
  return errors;
};

const SignupForm: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      firstPass: '',
      secondPass: '',
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      const data: any = await dispatch(registerUser(values));
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
        <h1>{t('signUpBold')}</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.fieldsWrapper}>
            <FormikInput
              name="email"
              type="email"
              title={t('email')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <p>{formik.errors.email}</p>
            ) : null}
          </div>

          <div className={styles.fieldsWrapper}>
            <FormikInput
              name="username"
              type="text"
              title={t('login')}
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
            />

            {formik.errors.username && formik.touched.username ? (
              <p>{formik.errors.username}</p>
            ) : null}
          </div>

          <div className={styles.fieldsWrapper}>
            <FormikInput
              name="firstPass"
              type="password"
              title={t('enterPassword')}
              onChange={formik.handleChange}
              value={formik.values.firstPass}
              onBlur={formik.handleBlur}
            />
            {formik.errors.firstPass && formik.touched.firstPass ? (
              <p>{formik.errors.firstPass}</p>
            ) : null}
          </div>

          <div className={styles.fieldsWrapper}>
            <FormikInput
              name="secondPass"
              type="password"
              title={t('confirmPassword')}
              onChange={formik.handleChange}
              value={formik.values.secondPass}
              onBlur={formik.handleBlur}
            />
            {formik.errors.secondPass && formik.touched.secondPass ? (
              <p>{formik.errors.secondPass}</p>
            ) : null}
          </div>

          <div className={styles.buttonsWrapper}>
            <button
              disabled={
                formik.isSubmitting || Object.keys(formik.errors).length > 0
              }
              type="submit"
            >
              {t('signUp')}
            </button>
            <NavLink
              className={styles.link}
              to={`${ROUTES.AUTH}/${ROUTES.LOGIN}`}
            >
              {t('signIn')}
            </NavLink>
          </div>
        </form>
        <GoogleLogin setError={setError} />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </main>
  );
};

export default withHomeRedirect(SignupForm);
