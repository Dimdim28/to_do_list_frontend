import { Dispatch, SetStateAction, FC } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../../../components/common/Button/Button";
import Preloader from "../../../../components/Preloader/Preloader";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { logout } from "../../../../redux/slices/auth/auth";
import { clear } from "../../../../redux/slices/home/home";
import {
  selectProfileMessage,
  selectProfileStatus,
} from "../../../../redux/slices/profile/selectors";
import { deleteAccount } from "../../../../redux/slices/profile/thunk";
import { Status } from "../../../../types";

import styles from "./DeleteProfile.module.scss";

interface DeleteAccountProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}

const DeleteProfile: FC<DeleteAccountProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const status = useAppSelector(selectProfileStatus);
  const error = useAppSelector(selectProfileMessage);

  const submit = async () => {
    await dispatch(deleteAccount());

    dispatch(logout());
    dispatch(clear());
    toggleActive(false);
  };

  const cancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper} data-testid="delete-profile-container">
      {status === Status.LOADING ? (
        <Preloader />
      ) : (
        <>
          <h3 className={styles.title} data-testid="are-you-sure-component">
            {t("areYouSure")}
          </h3>
          <div className={styles.buttons}>
            <Button
              text={t("no")}
              callback={cancel}
              class="cancel"
              data-testid="cancel-component"
            />
            <Button
              text={t("yes")}
              callback={submit}
              class="submit"
              data-testid="submit-component"
            />
          </div>

          {status === Status.ERROR && <p className={styles.error}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default DeleteProfile;
