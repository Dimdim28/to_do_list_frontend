import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import subTasksAPI from '../../../../../../api/subTaskAPI';
import Button from '../../../../../../components/common/Button/Button';
import Preloader from '../../../../../../components/Preloader/Preloader';
import { truncate } from '../../../../../../helpers/string';
import { useAppDispatch } from '../../../../../../hooks';
import {
  removeMySubTaskFromTasksList,
  removeSubTaskFromTask,
} from '../../../../../../redux/slices/home/home';
import { SubTask } from '../../../../../../types/entities/SubTask';
import { Status } from '../../../../../../types/shared';

import styles from './SubTaskDeleting.module.scss';

interface SubTaskDeletingProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: {
    setSubTasksArray: Dispatch<SetStateAction<SubTask[]>>;
    hideModal: () => void;
    subTaskId: string;
    title: string;
    parentTaskId: string;
  };
}

const SubTaskDeleting: FC<SubTaskDeletingProps> = ({
  childProps,
  toggleActive,
}) => {
  const { subTaskId, title, parentTaskId, setSubTasksArray } = childProps;

  const [status, setStatus] = useState(Status.SUCCESS);
  const [taskError, setTaskError] = useState('');

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const submit = async () => {
    setStatus(Status.LOADING);
    const result = await subTasksAPI.deleteSubTask(subTaskId);
    const { message, status } = result;
    setStatus(status);
    setTaskError(message || '');
    if (status === Status.SUCCESS) {
      dispatch(removeSubTaskFromTask({ taskId: parentTaskId, subTaskId }));
      setSubTasksArray((subTasks) =>
        subTasks.filter((el) => el._id !== subTaskId),
      );
      dispatch(removeMySubTaskFromTasksList(subTaskId));
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
