import { useEffect, useState } from 'react';

import Button from '../../../../components/common/Button/Button';
import SearchUser from '../../../../components/SearchUser/SearchUser';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  addUserToProject,
  setIsAddUserToProjectModalOpened,
} from '../../../../redux/slices/canban/canban';
import { selectIsAddUserProjectModalOpened } from '../../../../redux/slices/canban/selectors';
import { User } from '../../../../types/shared';
import ChosenUser from '../../../Home/Tasks/ChosenUser/ChosenUser';

import styles from './AddUserToProjectModal.module.scss';

const AddUserToProjectModal = () => {
  const isOpened = useAppSelector(selectIsAddUserProjectModalOpened);

  const dispatch = useAppDispatch();

  const [assigner, setAssigner] = useState<User | null>(null);

  const handleClose = () => {
    dispatch(setIsAddUserToProjectModalOpened(false));
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleSubmit = () => {
    if (!assigner) return;
    dispatch(addUserToProject(assigner));
    handleClose();
  };

  useEffect(() => {
    setAssigner(null);
  }, [isOpened]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {assigner ? (
          <ChosenUser
            user={assigner}
            removeUser={() => {
              setAssigner(null);
            }}
            isForCreation={!!assigner}
          />
        ) : (
          <SearchUser
            handleUserClick={(user: User) => {
              setAssigner(user);
            }}
          />
        )}
      </div>

      <div className={styles.buttons}>
        <Button text="Cancel" class="cancel" callback={handleCancel}></Button>
        <Button text="Submit" class="submit" callback={handleSubmit}></Button>
      </div>
    </div>
  );
};

export default AddUserToProjectModal;
