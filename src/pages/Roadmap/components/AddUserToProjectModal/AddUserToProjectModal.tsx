import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import roadmapApi from '../../../../api/roadmapApi';
import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/Preloader/Preloader';
import SearchUser from '../../../../components/SearchUser/SearchUser';
import { useAppDispatch } from '../../../../hooks';
import { addUserToRoadmapMembers } from '../../../../redux/slices/roadmap/roadmap';
import { Status, User } from '../../../../types/shared';
import ChosenUser from '../../../Home/Tasks/ChosenUser/ChosenUser';

import styles from './AddUserToProjectModal.module.scss';

interface AddUserToProjectModalProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: { isOpened: boolean; projectId: string };
}
const AddUserToProjectModal: FC<AddUserToProjectModalProps> = ({
  toggleActive,
  childProps,
}) => {
  const projectId = childProps.projectId;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [assigner, setAssigner] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCancel = () => {
    toggleActive(false);
  };

  const handleSubmit = async () => {
    if (!assigner || !projectId) return;
    setIsLoading(true);
    const result = await roadmapApi.addUserToRoadmap({
      roadmapId: projectId,
      userId: assigner._id,
    });

    if (result.status === Status.SUCCESS) {
      dispatch(addUserToRoadmapMembers(assigner));
      setError('');
      setIsLoading(false);
      toggleActive(false);
    } else {
      setError(result.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setAssigner(null);
  }, [childProps.isOpened]);

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
