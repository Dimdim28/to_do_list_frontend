import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import canbanAPI from '../../../../api/canbanApi';
import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/Preloader/Preloader';
import { truncate } from '../../../../helpers/string';
import { useAppSelector } from '../../../../hooks';
import { selectIsProjectInfo } from '../../../../redux/slices/canban/selectors';
import { Status, User } from '../../../../types/shared';

import styles from './DeleteUser.module.scss';

interface DeleteUserProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: {
    user: User;
    deleteUser: (tag: User) => void;
  };
}
const DeleteUser: FC<DeleteUserProps> = ({ toggleActive, childProps }) => {
  // const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { user, deleteUser } = childProps;
  const projectInfo = useAppSelector(selectIsProjectInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const title = user?.username || '';
  const cancel = () => {
    toggleActive(false);
  };

  const submit = async () => {
    if (!projectInfo?.id || !user?._id) return;
    setIsLoading(true);

    const result = await canbanAPI.removeUser({
      boardId: projectInfo.id,
      targetUserId: user._id,
    });
    if (result.status === Status.SUCCESS) {
      deleteUser(user);
      setError('');
      setIsLoading(false);
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
