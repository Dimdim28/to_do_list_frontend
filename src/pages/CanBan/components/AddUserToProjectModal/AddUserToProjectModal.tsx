import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import canbanAPI from '../../../../api/canbanApi';
import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/Preloader/Preloader';
import SearchUser from '../../../../components/SearchUser/SearchUser';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  addUserToProject,
  setIsAddUserToProjectModalOpened,
} from '../../../../redux/slices/canban/canban';
import {
  selectIsAddUserProjectModalOpened,
  selectIsProjectInfo,
} from '../../../../redux/slices/canban/selectors';
import { Status, User } from '../../../../types/shared';
import ChosenUser from '../../../Home/Tasks/ChosenUser/ChosenUser';

import styles from './AddUserToProjectModal.module.scss';

const AddUserToProjectModal = () => {
  const isOpened = useAppSelector(selectIsAddUserProjectModalOpened);
  const projectInfo = useAppSelector(selectIsProjectInfo);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [assigner, setAssigner] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    dispatch(setIsAddUserToProjectModalOpened(false));
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleSubmit = async () => {
    if (!assigner || !projectInfo?.id) return;
    setIsLoading(true);
    const result = await canbanAPI.addUser({
      boardId: projectInfo.id,
      targetUserId: assigner._id,
    });

    if (result.status === Status.SUCCESS) {
      dispatch(addUserToProject(assigner));
      setError('');
      setIsLoading(false);
      handleClose();
    } else {
      setError(result.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setAssigner(null);
  }, [isOpened]);

  if (isLoading) return <Preloader />;

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
        <Button
          text={t('cancel')}
          class="cancel"
          callback={handleCancel}
        ></Button>
        <Button
          text={t('submit')}
          class="submit"
          callback={handleSubmit}
        ></Button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default AddUserToProjectModal;
