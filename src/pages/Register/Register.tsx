import React, {useState} from "react";
import { useFormik } from "formik";
import "./Register.module.scss";
import { selectIsAuth } from "../../redux/slices/auth/selectors";
import { Navigate } from "react-router";
import { useAppDispatch } from "../../hooks";
import { useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/auth/thunk";

interface Values {
  email?: string;
  lastname?: string;
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

  if (!values.lastname) {
    errors.lastname = "Required";
  } else if (values.lastname.length < 3) {
    errors.lastname = "Must be 3 characters or more";
  } else if (values.lastname.length > 15) {
    errors.lastname = "Must be 15 characters or less";
  }

  if (!values.firstPass) {
    errors.firstPass = "Required";
  } else if (values.firstPass.length < 5) {
    errors.firstPass = "Must be 5 characters or more";
  } else if (values.firstPass.length > 15) {
    errors.lastname = "Must be 15 characters or less";
  }

  if (!values.secondPass) {
    errors.secondPass = "Required";
  } else if (values.secondPass.length < 5) {
    errors.secondPass = "Must be 5 characters or more";
  } else if (values.secondPass.length > 15) {
    errors.lastname = "Must be 15 characters or less";
  } else if (values.firstPass !== values.secondPass) {
    errors.secondPass = "Passwords must be same";
  }

  if (values.firstPass !== values.secondPass) {
    errors.secondPass = "Passwords are not the same"
  }
  
  console.log(errors);
  return errors;
};

const SignupForm: React.FC = () => {
  const isRegistered = useSelector(selectIsAuth);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      lastname: "",
      firstPass: "",
      secondPass: ""
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

  if (isRegistered) return <Navigate to="/" />;

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

          <label htmlFor="lastname">Last Name</label>
          <input
            id="login"
            name="login"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            onBlur={formik.handleBlur}
          />
          {formik.errors.lastname && formik.touched.lastname ? (
            <p>{formik.errors.lastname}</p>
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
