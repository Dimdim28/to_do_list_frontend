import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";

import withHomeRedirect from "../../hoc/withHomeRedirect";
import { FormikInput } from "../../components/common/Input/Input";
import { useAppDispatch } from "../../hooks";
import { registerUser } from "../../redux/slices/auth/thunk";
import ROUTES from "../../routes";

interface Values {
  email?: string;
  login?: string;
  firstPass?: string;
  secondPass?: string;
}

const validate = (values: Values) => {
  const errors: Values = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.login) {
    errors.login = "Required";
  } else if (values.login.length < 3) {
    errors.login = "Must be 3 characters or more";
  } else if (values.login.length > 15) {
    errors.login = "Must be 15 characters or less";
  }

  if (!values.firstPass) {
    errors.firstPass = "Required";
  } else if (values.firstPass.length < 5) {
    errors.firstPass = "Must be 5 characters or more";
  } else if (values.firstPass.length > 15) {
    errors.firstPass = "Must be 15 characters or less";
  }

  if (!values.secondPass) {
    errors.secondPass = "Required";
  } else if (values.secondPass.length < 5) {
    errors.secondPass = "Must be 5 characters or more";
  } else if (values.secondPass.length > 15) {
    errors.secondPass = "Must be 15 characters or less";
  } else if (values.firstPass !== values.secondPass) {
    errors.secondPass = "Passwords must be same";
  }

  if (values.firstPass !== values.secondPass) {
    errors.secondPass = "Passwords are not the same";
  }
  return errors;
};

const SignupForm: React.FC = () => {
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      login: "",
      firstPass: "",
      secondPass: "",
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      const data: any = await dispatch(registerUser(values));
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
        <h1>Sign up</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.fieldsWrapper}>
            <FormikInput
              name="email"
              type="email"
              title="email"
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
              name="login"
              type="text"
              title="login"
              onChange={formik.handleChange}
              value={formik.values.login}
              onBlur={formik.handleBlur}
            />

            {formik.errors.login && formik.touched.login ? (
              <p>{formik.errors.login}</p>
            ) : null}
          </div>

          <div className={styles.fieldsWrapper}>
            <FormikInput
              name="firstPass"
              type="password"
              title="enter password"
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
              title="confirm password"
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
              Sign up
            </button>
            <NavLink
              className={styles.link}
              to={`${ROUTES.AUTH}/${ROUTES.LOGIN}`}
            >
              Sign in
            </NavLink>
          </div>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </main>
  );
};

export default withHomeRedirect(SignupForm);
