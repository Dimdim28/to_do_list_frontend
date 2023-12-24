import { useEffect, useState, FC } from 'react';

import Tasks from './Tasks/Tasks';
import Filters from './FiltersBar/FiltersBar';
import withLoginRedirect from '../../hoc/withLoginRedirect';
import { useAppDispatch } from '../../hooks';
import { clearCategories } from '../../redux/slices/home/home';
import { fetchCategories } from '../../redux/slices/home/thunk';
import { IsCompleted, Date } from './FiltersBar/Filters/Filters';
import taskAPI, { Task, getTask } from '../../api/taskAPI';

import styles from './Home.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Home: FC = () => {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<Date>('all');
  const [isCompleted, setIsCompleted] = useState<IsCompleted>('false');
  const [categories, setCategories] = useState<string[]>([]);

  const [TasksArray, setTasks] = useState<Task[]>([]);
  const [totalTaskPages, setTotalTaskPages] = useState(1);
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isNavBarOpened, setIsNavberOpened] = useState(true);

  const fetchingParams: getTask = {
    page: currentPage,
    deadline: date,
    categories,
  };

  if (isCompleted !== 'all') {
    if (isCompleted === 'false') {
      fetchingParams.isCompleted = false;
    } else {
      fetchingParams.isCompleted = true;
    }
  }

  useEffect(() => {
    dispatch(fetchCategories(fetchingParams));
    return () => {
      dispatch(clearCategories());
    };
  }, []);

  useEffect(() => {
    let cb = function () {
      if (window.innerWidth < 680) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener('resize', cb);

    return () => {
      window.removeEventListener('resize', cb);
    };
  }, []);

  async function fetchTasks(params?: getTask) {
    setIsTasksLoading(true);
    setTasksError('');
    const result = await taskAPI.getTasks(params);
    if (!result) {
      setTasksError('Could not fetch tasks');
      return;
    }
    const { message, tasks, totalPages: fetchedTotalPages } = result;
    if (message) {
      setTasksError(message);
    } else {
      setTasks(tasks);
      setTotalTaskPages(fetchedTotalPages || totalTaskPages);
      setIsTasksLoading(false);
    }
  }

  return (
    <div className={styles.row}>
      {isMobile && (
        <FontAwesomeIcon
          icon={faBars}
          className={styles.menu}
          onClick={() => {
            setIsNavberOpened(true);
          }}
        />
      )}
      {isNavBarOpened && (
        <Filters
          isMobile={isMobile}
          date={date}
          setDate={setDate}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
          categories={categories}
          setCategories={setCategories}
          fetchTasks={fetchTasks}
          taskFetchingParams={fetchingParams}
          setIsNavberOpened={setIsNavberOpened}
        />
      )}

      <Tasks
        isMobile={isMobile}
        Tasks={TasksArray}
        setTasks={setTasks}
        totalPages={totalTaskPages}
        isLoading={isTasksLoading}
        error={tasksError}
        fetchTasks={fetchTasks}
        taskFetchingParams={fetchingParams}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default withLoginRedirect(Home);
