import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import roadmapAPI from '../../../../api/roadmapApi';
import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/Preloader/Preloader';
import { truncate } from '../../../../helpers/string';
import { useAppDispatch } from '../../../../hooks';
import { removeUserFromRoadmapMembers } from '../../../../redux/slices/roadmap/roadmap';
import { Status, User } from '../../../../types/shared';

import styles from './DeleteUser.module.scss';

interface DeleteUserProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: {
    user: User;
    projectId: string;
  };
}

const DeleteUser: FC<DeleteUserProps> = ({ toggleActive, childProps }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { user, projectId } = childProps;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const title = user?.username || '';
  const cancel = () => {
    toggleActive(false);
  };

  const deleteUser = (currentUser: User) => {
    dispatch(removeUserFromRoadmapMembers(currentUser._id));
  };

  const submit = async () => {
    if (!projectId || !user?._id) return;
    setIsLoading(true);

    const result = await roadmapAPI.removeUserFromRoadmap({
      roadmapId: projectId,
      userId: user._id,
    });
    if (result.status === Status.SUCCESS) {
      deleteUser(user);
      setIsLoading(false);
      setError('');
      toggleActive(false);
    } else {
      setError(result.message);
      setIsLoading(false);
    }
  };

  if (isLoading) return <Preloader />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>{t('sureDeleteUser')}</p>
        <h3>{truncate(title, 12)}?</h3>
      </div>

      <div className={styles.actions}>
        <Button text={t('cancel')} callback={cancel} class="cancel" />
        <Button text={t('submit')} callback={submit} class="submit" />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default DeleteUser;
