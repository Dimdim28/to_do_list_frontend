import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import canbanAPI from '../../../../../api/canbanApi';
import Button from '../../../../../components/common/Button/Button';
import Preloader from '../../../../../components/Preloader/Preloader';
import { truncate } from '../../../../../helpers/string';
import { useAppDispatch } from '../../../../../hooks';
import { deleteProject } from '../../../../../redux/slices/canban/canban';
import { Status } from '../../../../../types/shared';

import styles from './LeaveProjectModal.module.scss';

interface ExitProjectProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: { projectId: string; projectName: string };
}
const ExitProject: FC<ExitProjectProps> = ({ toggleActive, childProps }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const title = childProps.projectName;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const cancel = () => {
    toggleActive(false);
  };

  const submit = async () => {
    if (!childProps.projectId) return;
    setIsLoading(true);

    const result = await canbanAPI.leaveBoard(childProps.projectId);
    if (result.status === Status.SUCCESS) {
      dispatch(deleteProject(childProps.projectId));
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
        <p>{t('sureExitProject')}</p>
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

export default ExitProject;
