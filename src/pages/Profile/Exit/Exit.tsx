import { Dispatch, SetStateAction, FC } from "react";

import Button from "../../../components/common/Button/Button";
import Preloader from "../../../components/Preloader/Preloader";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { logout } from "../../../redux/slices/auth/auth";
import { clear } from "../../../redux/slices/home/home";
import { exit } from "../../../redux/slices/profile/profile";
import {
  selectProfileMessage,
  selectProfileStatus,
} from "../../../redux/slices/profile/selectors";
import { Status } from "../../../types";

import styles from "./Exit.module.scss";

interface ExitFromAccountProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}

const Exit: FC<ExitFromAccountProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();
  
  const status = useAppSelector(selectProfileStatus);
  const error = useAppSelector(selectProfileMessage);

  const submit = async () => {
    dispatch(logout());
    dispatch(exit());
    dispatch(clear());
    toggleActive(false);
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

export default Exit;
