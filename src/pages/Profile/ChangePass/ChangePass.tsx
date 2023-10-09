import { FC } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import { FormikInput } from "../../../components/common/Input/Input";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { selectProfileStatus } from "../../../redux/slices/profile/selectors";
import { changePass } from "../../../redux/slices/profile/thunk";
import { validate } from "./helpers";
import { Status } from "../../../types";

import styles from "./ChangePass.module.scss";

interface ChangePassProps {
  id: string;
}
export const ChangePass: FC<ChangePassProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const status = useAppSelector(selectProfileStatus);
  
  const formik = useFormik({
    initialValues: {
      firstpass: "",
      secondpass: "",
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      await dispatch(
        changePass({
          oldPassword: values.firstpass,
          newPassword: values.secondpass,
        })
      );
      if (status === Status.SUCCESS) {
        formik.resetForm();
        setSubmitting(false);
      }
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
              title={t("password")}
            />
            {formik.errors.firstpass && formik.touched.firstpass ? (
              <p>{formik.errors.firstpass}</p>
            ) : null}
          </div>

          <div className={styles.fieldsWrapper}>
            <FormikInput
              name="secondpass"
              type="password"
              title={t("newPassword")}
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
          {t("submit")}
        </button>
      </form>
    </aside>
  );
};
