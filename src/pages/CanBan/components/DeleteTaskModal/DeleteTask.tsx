import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import canbanAPI from '../../../../api/canbanApi';
import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/Preloader/Preloader';
import { truncate } from '../../../../helpers/string';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { deleteTask } from '../../../../redux/slices/canban/canban';
import {
  selectIsProjectInfo,
  selectProcessingColumnData,
  selectSelectedTask,
} from '../../../../redux/slices/canban/selectors';
import { Status } from '../../../../types/shared';

import styles from './DeleteTask.module.scss';

interface DeleteTaskProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}
const DeleteTask: FC<DeleteTaskProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const columnData = useAppSelector(selectProcessingColumnData);
  const taskData = useAppSelector(selectSelectedTask);
  const projectInfo = useAppSelector(selectIsProjectInfo);

  const title = taskData?.task?.title || '';

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const cancel = () => {
    toggleActive(false);
  };

  const submit = async () => {
    if (!projectInfo?.id || !taskData.task || !columnData) return;
    setIsLoading(true);

    const result = await canbanAPI.deleteTask({
      boardId: projectInfo.id,
      columnId: columnData.id,
      taskId: taskData.task._id,
    });
    if (result.status === Status.SUCCESS) {
      dispatch(
        deleteTask({ columnId: columnData.id, taskId: taskData.task._id }),
      );
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
        <p>{t('sureDeleteTask')}</p>
        <h3>{truncate(title, 12)}?</h3>
      </div>

      <div className={styles.actions}>
        <Button text={t('cancel')} callback={cancel} class="cancel" />
        <Button
          text={t('submit')}
          callback={submit}
          class="submit"
          disabled={title.length < 3}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default DeleteTask;
