import { useEffect, useState, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector, usePrevious } from '../../../hooks';
import {
  selectTaskTotalPages,
  selectTasks,
  selectTasksError,
  selectTasksStatus,
} from '../../../redux/slices/home/selectors';
import { Status } from '../../../types';
import { fetchTasks } from '../../../redux/slices/home/thunk';
import { updateTaskCompletionStatus } from '../../../redux/slices/home/home';

import TaskDeleting from './TaskDeleting/TaskDeleting';
import TaskEditing from './TaskEditing/TaskForm';
import TaskCard from './TaskCard/TaskCard';
import Pagination from './Pagination/Pagination';
import Preloader from '../../../components/Preloader/Preloader';
import TaskAddingLink from './TaskAddingLink/TaskAddingLink';
import { Modal } from '../../../components/common/Modal/Modal';
import { Task, getTask } from '../../../api/taskAPI';
import TaskInfo from './TaskInfo/TaskInfo';

import styles from './Tasks.module.scss';

interface TaskProps {
  taskFetchingParams: getTask;
  isMobile?: boolean;
}

const Tasks: FC<TaskProps> = ({ taskFetchingParams, isMobile }) => {
  const { page, isCompleted, deadline, categories } = taskFetchingParams;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [taskDeleting, setTaskDeleting] = useState(false);
  const [taskEditing, setTaskEditing] = useState(false);
  const [taskSharing, setTaskSharing] = useState(false);
  const [taskAddingLink, setTaskAddingLink] = useState(false);
  const [taskInfo, setTaskInfo] = useState(false);
  const [taskProps, setTaskProps] = useState<Task | {}>({});

  const loadingStatus = useAppSelector(selectTasksStatus);
  const errorMessage = useAppSelector(selectTasksError);
  const tasks = useAppSelector(selectTasks);
  const totalPages = useAppSelector(selectTaskTotalPages);

  const prevIsCompleted = usePrevious(isCompleted);
  const prevDeadline = usePrevious(deadline);
  const prevCategories = usePrevious(categories);

  const updateTaskStatus = (id: string, isCompleted: boolean) => {
    dispatch(updateTaskCompletionStatus({ id, isCompleted }));
  };

  useEffect(() => {
    if (
      isCompleted === prevIsCompleted &&
      deadline === prevDeadline &&
      categories === prevCategories
    ) {
      dispatch(fetchTasks(taskFetchingParams));
      return;
    }
    dispatch(fetchTasks({ ...taskFetchingParams, page: 1 }));
  }, [isCompleted, deadline, categories, page]);

  return (
    <main
      className={`${
        tasks && tasks.length > 0 ? styles.wrapperWithTasks : styles.wrapper
      } ${isMobile && styles.mobileWrapper}`}
    >
      <div className={styles.line}>
        <button
          className={styles.createTask}
          onClick={() => {
            // setTaskEditing(true);
            // setTaskProps({
            //   fetchTasks,
            //   taskFetchingParams,
            //   setCurrentPage,
            //   length: Tasks?.length || 0,
            // });
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
                    length={Tasks.length}
                    fetchTasks={() => {}}
                    taskFetchingParams={taskFetchingParams}
                    setCurrentPage={() => {}}
                    updateTaskStatus={updateTaskStatus}
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
