import { useState, Dispatch, SetStateAction, FC } from 'react';
import { useTranslation } from 'react-i18next';

import Preloader from '../../../../components/Preloader/Preloader';
import Button from '../../../../components/common/Button/Button';
import taskAPI, { Task } from '../../../../api/taskAPI';
import { truncate } from '../../../../helpers/string';
import { Status } from '../../../../types';
import subTasksAPI from '../../../../api/subTaskAPI';

import styles from './TaskDeleting.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  removeTaskFromList,
  updateTaskCurrentPage,
} from '../../../../redux/slices/home/home';
import { selectTaskCurrentPage } from '../../../../redux/slices/home/selectors';

interface TaskDeletingProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: Task & {
    length: number;
    isForSubTask?: boolean;
  };
}

const TaskDeleting: FC<TaskDeletingProps> = ({ childProps, toggleActive }) => {
  const { _id, title, length, isForSubTask } = childProps;

  const currentPage = useAppSelector(selectTaskCurrentPage);

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
        dispatch(updateTaskCurrentPage((currentPage || 2) - 1));
      } else {
        dispatch(removeTaskFromList(_id));
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
