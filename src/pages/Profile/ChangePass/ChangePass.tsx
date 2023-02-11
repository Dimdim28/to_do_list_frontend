import { useFormik } from "formik";
import React, { useState } from "react";
import { FormikInput } from "../../../components/common/Input/Input";
import { useAppDispatch } from "../../../hooks";
import styles from "./ChangePass.module.scss";

interface Values {
  firstpass?: string;
  secondpass?: string;
}

const validate = (values: Values) => {
  const errors: Values = {};

  if (!values.firstpass) {
    errors.firstpass = "Required";
  } else if (values.firstpass.length < 5) {
    errors.firstpass = "Must be 5 characters or more";
  } else if (values.firstpass.length > 15) {
    errors.firstpass = "Must be 15 characters or less";
  }
  if (!values.secondpass) {
    errors.secondpass = "Required";
  } else if (values.secondpass.length < 5) {
    errors.secondpass = "Must be 5 characters or more";
  } else if (values.secondpass.length > 15) {
    errors.secondpass = "Must be 15 characters or less";
  }

  return errors;
};

export const ChangePass = () => {
  const [error, setError] = useState(null);
  // const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      firstpass: "",
      secondpass: "",
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      //   const data: any = await dispatch(fetchUserData(values));
      //   if (data.error) setError(data.payload);
      //   if ("token" in data.payload) {
      //     window.localStorage.setItem("token", data.payload.token);
      //   }
      formik.resetForm();
      setSubmitting(false);
    },
  });

  return (
    <aside className={styles.aside}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.wrapper}>
          <div className={styles.fieldsWrapper}>
            <FormikInput
              name="firstpass"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstpass}
              title="password"
            />
            {formik.errors.firstpass && formik.touched.firstpass ? (
              <p>{formik.errors.firstpass}</p>
            ) : null}
          </div>

          <div className={styles.fieldsWrapper}>
            <FormikInput
              name="secondpass"
              type="password"
              title="new password"
              onChange={formik.handleChange}
              value={formik.values.secondpass}
              onBlur={formik.handleBlur}
            />
            {formik.errors.secondpass && formik.touched.secondpass ? (
              <p>{formik.errors.secondpass}</p>
            ) : null}
          </div>
        </div>

        <button
          className={styles.button}
          disabled={
            formik.isSubmitting || Object.keys(formik.errors).length > 0
          }
          type="submit"
        >
          submit
        </button>
      </form>
      {error ? <p className={styles.error}>{error}</p> : null}
    </aside>
  );
};
