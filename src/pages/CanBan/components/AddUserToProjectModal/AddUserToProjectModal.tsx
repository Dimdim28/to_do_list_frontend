import { useEffect, useState } from 'react';

import Button from '../../../../components/common/Button/Button';
import SearchUser from '../../../../components/SearchUser/SearchUser';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  setEditProjectModalOpened,
  setProjectInfo,
} from '../../../../redux/slices/canban/canban';
import {
  selectIsProjectInfo,
  selectIsProjectSettingsOpened,
} from '../../../../redux/slices/canban/selectors';
import { User } from '../../../../types/shared';
import ChosenUser from '../../../Home/Tasks/ChosenUser/ChosenUser';

import styles from './AddUserToProjectModal.module.scss';

const AddUserToProjectModal = () => {
  const projectInfo = useAppSelector(selectIsProjectInfo);
  const isOpened = useAppSelector(selectIsProjectSettingsOpened);

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(projectInfo.title);
  const [description, setDescription] = useState(projectInfo.description);
  const [assigner, setAssigner] = useState<User | null>(null);

  const handleClose = () => {
    dispatch(setEditProjectModalOpened(false));
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleSubmit = () => {
    handleClose();
    dispatch(setProjectInfo({ title, description }));
  };

  useEffect(() => {
    setTitle(projectInfo.title);
    setDescription(projectInfo.description);
  }, [projectInfo, isOpened]);

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
