import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
}

export const TaskDeleting: FC<TaskDeletingProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentTask = useAppSelector(selectRoadmapCurrentTask);
  const currentCategory = useAppSelector(selectRoadmapCurrentCategory);
  const currentRow = useAppSelector(selectRoadmapCurrentRow);

  const [status] = useState(Status.SUCCESS);
  const [categoryError] = useState('');

  const submit = async () => {
    if (!currentTask || !currentCategory || !currentRow) return;
    // setStatus(Status.LOADING);
    // const result = await categoryAPI.deleteCategory(_id);
    // const { message, status } = result;
    // setStatus(status);
    // setCategoryError(message || '');
    // if (status === Status.SUCCESS) {
    //   dispatch(removeCategoryFromList(_id));
    //   dispatch(removeCategoryFromTasksList(_id));
    toggleActive(false);
    // }
    dispatch(
      deleteRoadmapTask({
        categoryId: currentCategory._id,
        taskId: currentTask._id,
        rowId: currentRow._id,
      }),
    );
  };

  const cancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      {status === Status.LOADING ? (
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
          {categoryError && <p className={styles.error}>{categoryError}</p>}
        </>
      )}
    </div>
  );
};
