import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Preloader from '../../../../../../components/Preloader/Preloader';
import Button from '../../../../../../components/common/Button/Button';
import { Status } from '../../../../../../types';
import { truncate } from '../../../../../../helpers/string';
import { getTask } from '../../../../../../api/taskAPI';
import subTasksAPI, { SubTask } from '../../../../../../api/subTaskAPI';

import styles from './SubTaskDeleting.module.scss';

interface SubTaskDeletingProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: {
    setSubTasksArray: Dispatch<SetStateAction<SubTask[]>>;
    hideModal: () => void;
    subTaskId: string;
    title: string;
    taskFetchingParams: getTask;
    fetchTasks: (params: getTask) => void;
  };
}

const SubTaskDeleting: FC<SubTaskDeletingProps> = ({
  childProps,
  toggleActive,
}) => {
  const { subTaskId, title, taskFetchingParams, fetchTasks, setSubTasksArray } =
    childProps;

  const [status, setStatus] = useState(Status.SUCCESS);
  const [taskError, setTaskError] = useState('');

  const { t } = useTranslation();

  const submit = async () => {
    setStatus(Status.LOADING);
    const result = await subTasksAPI.deleteSubTask(subTaskId);
    const { message, status } = result;
    setStatus(status);
    setTaskError(message || '');
    if (status === Status.SUCCESS) {
      fetchTasks(taskFetchingParams);
      setSubTasksArray((subTasks) =>
        subTasks.filter((el) => el._id !== subTaskId),
      );
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
          <div className={styles.modalContent}>
            <p>{t('reallySubTask')}</p>
            <h3>{truncate(title, 12)}</h3>
          </div>
          <div className={styles.actions}>
            <Button text={t('no')} callback={cancel} class="cancel" />
            <Button
              text={t('yes')}
              callback={submit}
              class="submit"
              data-testid="submit-button"
            />
          </div>
          {taskError && <p className={styles.error}>{taskError}</p>}
        </>
      )}
    </div>
  );
};

export default SubTaskDeleting;
