import { Dispatch, SetStateAction, FC} from "react";

import Button from "../../../components/common/Button/Button";
import Preloader from "../../../components/Preloader/Preloader";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { logout } from "../../../redux/slices/auth/auth";
import { selectProfile } from "../../../redux/slices/auth/selectors";
import { clear } from "../../../redux/slices/home/home";
import {
  selectProfileMessage,
  selectProfileStatus,
} from "../../../redux/slices/profile/selectors";
import { deleteAccount } from "../../../redux/slices/profile/thunk";
import { Status } from "../../../types";

import styles from "./DeleteProfile.module.scss";

interface DeleteAccountProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}

const DeleteProfile: FC<DeleteAccountProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectProfile)?._id || "";
  const status = useAppSelector(selectProfileStatus);
  const error = useAppSelector(selectProfileMessage);

  const submit = async () => {
    const result: any = await dispatch(deleteAccount({ id: userId }));
    if (result.payload.message) {
      dispatch(logout());
      dispatch(clear());
      toggleActive(false);
    }
  };

  const cancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      {status === Status.LOADING ? (
        <Preloader />
      ) : (
        <>
          <h3 className={styles.title}>Are you sure?</h3>

          <div className={styles.buttons}>
            <Button text="No" callback={cancel} class="cancel" />
            <Button text="Yes" callback={submit} class="submit" />
          </div>

          {status === Status.ERROR && <p className={styles.error}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default DeleteProfile;
