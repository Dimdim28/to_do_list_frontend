import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import roadmapAPI from '../../../../api/roadmapApi';
import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/Preloader/Preloader';
import { truncate } from '../../../../helpers/string';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { deleteRoadmapTask } from '../../../../redux/slices/roadmap/roadmap';
import {
  selectRoadmapCurrentCategory,
  selectRoadmapCurrentRow,
  selectRoadmapCurrentTask,
} from '../../../../redux/slices/roadmap/selectors';
import { Status } from '../../../../types/shared';

import styles from './TaskDeleting.module.scss';

interface TaskDeletingProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: { roadmapId: string };
}

export const TaskDeleting: FC<TaskDeletingProps> = ({
  toggleActive,
  childProps,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentTask = useAppSelector(selectRoadmapCurrentTask);
  const currentCategory = useAppSelector(selectRoadmapCurrentCategory);
  const currentRow = useAppSelector(selectRoadmapCurrentRow);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async () => {
    if (!currentTask || !currentCategory || !currentRow) return;

    setIsLoading(true);
    const result = await roadmapAPI.deleteTask({
      roadmapId: childProps.roadmapId,
      categoryId: currentCategory._id,
      rowId: currentRow._id,
      taskId: currentTask._id,
    });

    if (result.status === Status.SUCCESS) {
      dispatch(
        deleteRoadmapTask({
          categoryId: currentCategory._id,
          rowId: currentRow._id,
          taskId: currentTask._id,
        }),
      );
      setIsLoading(false);
      toggleActive(false);
    } else {
      setMessage(result.message);
      setIsLoading(false);
    }
  };

  const cancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Preloader data-testid="preloader" />
      ) : (
        <>
          <div className={styles.modalContent}>
            <p>{t('reallyTask')}</p>
            <h3 style={{ color: currentCategory?.color }}>
              {truncate(currentTask?.title || '', 12)}?
            </h3>
          </div>
          <div className={styles.buttons}>
            <Button text={t('no')} callback={cancel} class="cancel" />
            <Button text={t('yes')} callback={submit} class="submit" />
          </div>
          {message && <p className={styles.error}>{message}</p>}
        </>
      )}
    </div>
  );
};
