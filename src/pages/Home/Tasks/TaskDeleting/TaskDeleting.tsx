import { useState, Dispatch, SetStateAction, FC } from 'react';
import { useTranslation } from 'react-i18next';

import Preloader from '../../../../components/Preloader/Preloader';
import Button from '../../../../components/common/Button/Button';
import taskAPI, { Task, getTask } from '../../../../api/taskAPI';
import { truncate } from '../../../../helpers/string';
import { Status } from '../../../../types';
import subTasksAPI from '../../../../api/subTaskAPI';

import styles from './TaskDeleting.module.scss';
import { useAppDispatch } from '../../../../hooks';
import { fetchTasks } from '../../../../redux/slices/home/thunk';

interface TaskDeletingProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: Task & {
    taskFetchingParams: getTask;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    length: number;
    isForSubTask?: boolean;
  };
}

const TaskDeleting: FC<TaskDeletingProps> = ({ childProps, toggleActive }) => {
  const {
    _id,
    title,
    taskFetchingParams,
    setCurrentPage,
    length,
    isForSubTask,
  } = childProps;

  const [status, setStatus] = useState(Status.SUCCESS);
  const [taskError, setTaskError] = useState('');

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const submit = async () => {
    setStatus(Status.LOADING);
    const result = isForSubTask
      ? await subTasksAPI.editSubTask({ subTaskId: _id, rejected: true })
      : await taskAPI.deleteTask(_id);
    const { message, status } = result;
    setStatus(status);
    setTaskError(message || '');
    if (status === Status.SUCCESS) {
      if (length === 1) {
        setCurrentPage((prev) => {
          const params = {
            ...taskFetchingParams,
            page: prev >= 2 ? prev - 1 : 1,
          };
          dispatch(fetchTasks(params));
          return prev >= 2 ? prev - 1 : 1;
        });
      } else {
        dispatch(fetchTasks(taskFetchingParams));
      }
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
            <p>{isForSubTask ? t('reallyRejectSubTask') : t('reallyTask')}</p>
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

export default TaskDeleting;
