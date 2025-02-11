import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '../../../components/common/Modal/Modal';
import Preloader from '../../../components/Preloader/Preloader';
import { SearchTask } from '../../../components/SearchTask/SearchTask';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  updateTaskCurrentPage,
  updateTaskSearchPattern,
} from '../../../redux/slices/home/home';
import {
  selectTaskFetchingParams,
  selectTasks,
  selectTasksError,
  selectTasksSearchPattern,
  selectTasksStatus,
  selectTaskTotalPages,
} from '../../../redux/slices/home/selectors';
import { fetchTasks } from '../../../redux/slices/home/thunk';
import { SharedTask } from '../../../types/entities/SharedTask';
import { SubTask } from '../../../types/entities/SubTask';
import { Task } from '../../../types/entities/Task';
import { Status } from '../../../types/shared';

import Pagination from './Pagination/Pagination';
import TaskAddingLink from './TaskAddingLink/TaskAddingLink';
import TaskCard from './TaskCard/TaskCard';
import TaskDeleting from './TaskDeleting/TaskDeleting';
import TaskEditing from './TaskEditing/TaskForm';
import TaskInfo from './TaskInfo/TaskInfo';

import styles from './Tasks.module.scss';

interface TaskProps {
  isMobile?: boolean;
}

const Tasks: FC<TaskProps> = ({ isMobile }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [taskDeleting, setTaskDeleting] = useState(false);
  const [taskEditing, setTaskEditing] = useState(false);
  const [taskSharing, setTaskSharing] = useState(false);
  const [taskAddingLink, setTaskAddingLink] = useState(false);
  const [taskInfo, setTaskInfo] = useState(false);
  const [taskProps, setTaskProps] = useState<
    Task | SharedTask | SubTask | object
  >({});

  const loadingStatus = useAppSelector(selectTasksStatus);
  const errorMessage = useAppSelector(selectTasksError);
  const tasks = useAppSelector(selectTasks);
  const totalPages = useAppSelector(selectTaskTotalPages);
  const taskFetchingParams = useAppSelector(selectTaskFetchingParams);
  const taskSearchPattern = useAppSelector(selectTasksSearchPattern);

  const { page, isCompleted, deadline, categories } = taskFetchingParams;

  console.log('taskFetchingParams', taskFetchingParams);

  const updateSearchPattern = (value: string) => {
    dispatch(updateTaskSearchPattern(value));
  };

  useEffect(() => {
    dispatch(fetchTasks(taskFetchingParams));
  }, [isCompleted, deadline, categories, page]);

  return (
    <main
      className={`${
        tasks && tasks.length > 0 ? styles.wrapperWithTasks : styles.wrapper
      } ${isMobile && styles.mobileWrapper}`}
    >
      <div className={styles.line}>
        <SearchTask
          value={taskSearchPattern}
          changeValue={updateSearchPattern}
          callback={(value) => console.log(value)}
        />
        <button
          className={styles.createTask}
          onClick={() => {
            setTaskEditing(true);
            setTaskProps({
              length: tasks.length,
            });
          }}
        >
          {t('addTask')}
        </button>
      </div>
      <Modal
        active={taskDeleting}
        setActive={setTaskDeleting}
        ChildComponent={TaskDeleting}
        childProps={taskProps}
      />
      <Modal
        active={taskEditing}
        setActive={setTaskEditing}
        ChildComponent={TaskEditing}
        childProps={taskProps}
      />
      <Modal
        active={taskSharing}
        setActive={setTaskSharing}
        ChildComponent={TaskEditing}
        childProps={taskProps}
      />
      <Modal
        active={taskAddingLink}
        setActive={setTaskAddingLink}
        ChildComponent={TaskAddingLink}
        childProps={taskProps}
      />
      <Modal
        childProps={taskProps}
        ChildComponent={TaskInfo}
        active={taskInfo}
        setActive={setTaskInfo}
      />

      {loadingStatus === Status.LOADING ? (
        <Preloader />
      ) : (
        <div className={styles.tasksWrapper}>
          {errorMessage ? (
            <div className={styles.errorMessage}>{errorMessage}</div>
          ) : (
            <div className={styles.tasks}>
              {tasks && tasks.length > 0 ? (
                tasks.map((el) => (
                  <TaskCard
                    setTaskEditing={setTaskEditing}
                    setTaskProps={setTaskProps}
                    setTaskDeleting={setTaskDeleting}
                    setTaskSharing={setTaskSharing}
                    setTaskAddingLink={setTaskAddingLink}
                    setTaskInfo={setTaskInfo}
                    task={el}
                    key={el._id}
                    length={tasks.length}
                    setCurrentPage={(value: number) =>
                      dispatch(updateTaskCurrentPage(value))
                    }
                  />
                ))
              ) : (
                <p className={styles.noTasks}>{t('noTask')}</p>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <Pagination currentPage={page || 1} totalPages={totalPages} />
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Tasks;
