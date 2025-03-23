import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../../components/common/Button/Button';
import { Input } from '../../../../components/common/Input/Input';
import Preloader from '../../../../components/FallBackPreloader/FallBackPreloader';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  addRoadmapTask,
  editRoadmapTask,
} from '../../../../redux/slices/roadmap/roadmap';
import {
  selectRoadmapClickPosition,
  selectRoadmapCurrentCategory,
  selectRoadmapCurrentRow,
  selectRoadmapCurrentTask,
} from '../../../../redux/slices/roadmap/selectors';
import { Status } from '../../../../types/shared';

import styles from './TaskForm.module.scss';

interface TaskFormProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}

const TaskForm: FC<TaskFormProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentTask = useAppSelector(selectRoadmapCurrentTask);
  const currentCategory = useAppSelector(selectRoadmapCurrentCategory);
  const currentRow = useAppSelector(selectRoadmapCurrentRow);
  const clickPosition = useAppSelector(selectRoadmapClickPosition);

  const [status] = useState(Status.SUCCESS);
  const [categoryError] = useState('');

  const [title, setTittle] = useState(currentTask?.title || '');

  useEffect(() => {
    setTittle(currentTask?.title || '');
  }, [currentTask?.id]);

  const submit = async () => {
    if (!currentRow || !currentCategory) return;
    // setStatus(Status.LOADING);
    // const result = _id
    //   ? await categoryAPI.editCategory({ _id, title, color })
    //   : await categoryAPI.addCategory({ title, user: userId, color });
    // const { message, status, category } = result;
    // setStatus(status);
    // setCategoryError(message || '');
    // if (status === Status.SUCCESS) {
    toggleActive(false);
    //   if (_id) {
    //     dispatch(updateCategoryInTasksList({ _id, title, color }));
    //     dispatch(updateCategoryInList({ _id, title, color }));
    //   } else {
    //     dispatch(addCategoryToList(category));
    //   }
    // }
    if (currentTask) {
      dispatch(
        editRoadmapTask({
          task: { ...currentTask, title },
          categoryId: currentCategory.id,
          rowId: currentRow.id,
        }),
      );
    } else {
      const start = clickPosition || 0;
      dispatch(
        addRoadmapTask({
          task: {
            status: 'in_progress',
            progress: 0,
            start: start,
            end: start + 10,
            title,
            id: `${Math.random() * 1000 + 'category' + Math.random() * 100}`,
          },
          categoryId: currentCategory.id,
          rowId: currentRow.id,
        }),
      );
      setTittle('');
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
          <Input
            title={t('title')}
            value={title}
            setValue={setTittle}
            type="text"
          />

          <div className={styles.buttons}>
            <Button text={t('cancel')} callback={cancel} class="cancel" />
            <Button
              text={t('submit')}
              callback={submit}
              class="submit"
              disabled={title.length < 3}
            />
          </div>

          {categoryError && <p className={styles.error}>{categoryError}</p>}
        </>
      )}
    </div>
  );
};

export default TaskForm;
