import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import subTasksAPI from '../../../../api/subTaskAPI';
import taskAPI from '../../../../api/taskAPI';
import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/Preloader/Preloader';
import { truncate } from '../../../../helpers/string';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  removeTaskFromList,
  updateSubTaskIsRejectedStatusInSubtasksList,
  updateTaskCurrentPage,
} from '../../../../redux/slices/home/home';
import { selectTaskCurrentPage } from '../../../../redux/slices/home/selectors';
import { Task } from '../../../../types/entities/Task';
import { Status } from '../../../../types/shared';

import styles from './TaskDeleting.module.scss';

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
      ? await subTasksAPI.editSubTask({ subTaskId: _id, isRejected: true })
      : await taskAPI.deleteTask(_id);
    const { message, status } = result;
    setStatus(status);
    setTaskError(message || '');
    if (status === Status.SUCCESS) {
      if (length === 1) {
        dispatch(updateTaskCurrentPage((currentPage || 2) - 1));
      } else {
        dispatch(removeTaskFromList(_id));
        dispatch(
          updateSubTaskIsRejectedStatusInSubtasksList({
            subTaskId: _id,
            isRejected: true,
          }),
        );
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
            <h3>{truncate(title, 12)}?</h3>
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
