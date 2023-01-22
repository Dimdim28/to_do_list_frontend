import React from "react";
import { useFormik } from "formik";
import "./Register.module.scss";

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
    errors.login = "Must be 15 characters or less";
  }

  if (!values.secondPass) {
    errors.secondPass = "Required";
  } else if (values.secondPass.length < 5) {
    errors.secondPass = "Must be 5 characters or more";
  } else if (values.secondPass.length > 15) {
    errors.login = "Must be 15 characters or less";
  } else if (values.firstPass !== values.secondPass) {
    errors.secondPass = "Passwords must be same";
  }
  console.log(errors);
  return errors;
};

const SignupForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      login: "",
      firstPass: "",
      secondPass: "",
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      console.log("values =", values);
      formik.resetForm();
      setSubmitting(false);
    },
  });

  return (
    <main>
      <div className="wrapper">
        <h1>Sign up</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email"> email </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <p>{formik.errors.email}</p>
          ) : null}

          <label htmlFor="login">Last Name</label>
          <input
            id="login"
            name="login"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.login}
            onBlur={formik.handleBlur}
          />
          {formik.errors.login && formik.touched.login ? (
            <p>{formik.errors.login}</p>
          ) : null}

          <label htmlFor="firstPass"> Enter your password</label>
          <input
            id="firstPass"
            name="firstPass"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstPass}
            onBlur={formik.handleBlur}
          />
          {formik.errors.firstPass && formik.touched.firstPass ? (
            <p>{formik.errors.firstPass}</p>
          ) : null}

          <label htmlFor="secondPass"> Enter it again</label>
          <input
            id="secondPass"
            name="secondPass"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.secondPass}
            onBlur={formik.handleBlur}
          />
          {formik.errors.secondPass && formik.touched.secondPass ? (
            <p>{formik.errors.secondPass}</p>
          ) : null}

          <button
            disabled={
              formik.isSubmitting || Object.keys(formik.errors).length > 0
            }
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignupForm;
