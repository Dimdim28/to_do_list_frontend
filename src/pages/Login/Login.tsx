import { useState, FC } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import withHomeRedirect from "../../hoc/withHomeRedirect";
import { FormikInput } from "../../components/common/Input/Input";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchUserData } from "../../redux/slices/auth/thunk";
import { validate } from "./helpers";
import ROUTES from "../../routes";

import { selectLanguage, selectTheme } from "../../redux/slices/auth/selectors";
import { Language, Theme } from "../../types";
import { changeLang, changeTheme } from "../../redux/slices/auth/auth";

import styles from "./Login.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const Login: FC<{}> = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState(null);

  const theme = useAppSelector(selectTheme);
  const language = useAppSelector(selectLanguage);

  const { t, i18n } = useTranslation();

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    localStorage.setItem("theme", newTheme);
    dispatch(changeTheme(newTheme));
  };

  const toggleLang = (language: Language) => {
    const getNewLanguage = (): Language => {
      if (language === Language.EN) return Language.UA;
      if (language === Language.UA) return Language.EN;
      return Language.EN;
    };
    const newLanguage = getNewLanguage();
    i18n.changeLanguage(newLanguage);
    dispatch(changeLang(newLanguage));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      const data: any = await dispatch(fetchUserData(values));
      if (data.error) setError(data.payload);
      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }
      formik.resetForm();
      setSubmitting(false);
    },
  });

  return (
    <main>
      <div className={styles.wrapper}>
        <div className={styles.actionsWrapper}>
          <FontAwesomeIcon
            icon={theme === Theme.DARK ? faSun : faMoon}
            className={styles.themeIcon}
            onClick={toggleTheme}
          />
          <button
            className={styles.language}
            onClick={() => {
              toggleLang(language);
            }}
          >
            {i18n.language}
          </button>
        </div>
        <h1>{t("signIn")}</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.fieldsWrapper}>
            <FormikInput
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              title={t("email")}
            />
            {formik.errors.email && formik.touched.email ? (
              <p>{formik.errors.email}</p>
            ) : null}
          </div>

          <div className={styles.fieldsWrapper}>
            <FormikInput
              name="password"
              type="password"
              title={t("password")}
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
              {t("signIn")}
            </button>
            <NavLink
              className={styles.link}
              to={`${ROUTES.AUTH}/${ROUTES.REGISTER}`}
            >
              {t("signUp")}
            </NavLink>
          </div>

          {error ? <p className={styles.error}>{error}</p> : null}
        </form>
      </div>
    </main>
  );
};

export default withHomeRedirect(Login);
