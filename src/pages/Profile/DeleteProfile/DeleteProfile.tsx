import React, { useState } from "react";
import Button from "../../../components/common/Button/Button";
import Preloader from "../../../components/Preloader/Preloader";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { selectProfile } from "../../../redux/slices/auth/selectors";
import { Status } from "../../../types";
import styles from "./DeleteProfile.module.scss";

interface DeleteAccountProps {
  toggleActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteProfile: React.FC<DeleteAccountProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectProfile)?._id || "";
  const [status, setStatus] = useState(Status.SUCCESS);
  const [deleteAccountError, setDeleteAccounterror] = useState("");
  const submit = async () => {
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
          <h2 className={styles.title}>Are you sure?</h2>

          <div className={styles.buttons}>
            <Button text="No" callback={cancel} class="cancel" />
            <Button text="Yes" callback={submit} class="submit" />
          </div>

          {deleteAccountError && (
            <p className={styles.error}>{deleteAccountError}</p>
          )}
        </>
      )}
    </div>
  );
};

export default DeleteProfile;
