import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import roadmapAPI from '../../../../api/roadmapApi';
import Button from '../../../../components/common/Button/Button';
import { Input } from '../../../../components/common/Input/Input';
import Preloader from '../../../../components/Preloader/Preloader';
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
  childProps: { roadmapId: string };
}

const TaskForm: FC<TaskFormProps> = ({ toggleActive, childProps }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentTask = useAppSelector(selectRoadmapCurrentTask);
  const currentCategory = useAppSelector(selectRoadmapCurrentCategory);
  const currentRow = useAppSelector(selectRoadmapCurrentRow);
  const clickPosition = useAppSelector(selectRoadmapClickPosition);

  const [title, setTitle] = useState(currentTask?.title || '');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(currentTask?.title || '');
  }, [currentTask?._id]);

  const submit = async () => {
    if (!currentCategory || !currentRow) return;

    setIsLoading(true);
    setMessage('');

    if (currentTask) {
      const result = await roadmapAPI.updateTask({
        roadmapId: childProps.roadmapId,
        categoryId: currentCategory._id,
        rowId: currentRow._id,
        taskId: currentTask._id,
        title,
      });

      if (result.status === Status.SUCCESS) {
        dispatch(
          editRoadmapTask({
            task: { ...currentTask, title },
            categoryId: currentCategory._id,
            rowId: currentRow._id,
          }),
        );
        toggleActive(false);
      } else {
        setMessage(result.message);
      }
    } else {
      const start = clickPosition || 0;
      const result = await roadmapAPI.createTask({
        roadmapId: childProps.roadmapId,
        categoryId: currentCategory._id,
        rowId: currentRow._id,
        title,
        start,
        end: start + 10,
        progress: 0,
      });

      if (result.status === Status.SUCCESS) {
        dispatch(
          addRoadmapTask({
            task: result.data,
            categoryId: currentCategory._id,
            rowId: currentRow._id,
          }),
        );
        setTitle('');
        toggleActive(false);
      } else {
        setMessage(result.message);
      }
    }

    setIsLoading(false);
  };

  const cancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Input
            title={t('title')}
            value={title}
            setValue={setTitle}
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

          {message && <p className={styles.error}>{message}</p>}
        </>
      )}
    </div>
  );
};

export default TaskForm;
