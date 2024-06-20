import { useEffect, useState, FC } from 'react';

import Tasks from './Tasks/Tasks';
import Filters from './FiltersBar/FiltersBar';
import withLoginRedirect from '../../hoc/withLoginRedirect';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearCategories } from '../../redux/slices/home/home';
import { fetchCategories } from '../../redux/slices/home/thunk';
import { IsCompleted, Date } from './FiltersBar/Filters/Filters';
import { getTask } from '../../api/taskAPI';

import styles from './Home.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { selectTaskCurrentPage } from '../../redux/slices/home/selectors';

const Home: FC = () => {
  const dispatch = useAppDispatch();

  const [date, setDate] = useState<Date>('all');
  const [searchPattern, setSearchPattern] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<IsCompleted>('false');
  const [categories, setCategories] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isNavBarOpened, setIsNavberOpened] = useState(true);

  const currentPage = useAppSelector(selectTaskCurrentPage);

  const fetchingParams: getTask = {
    page: currentPage,
    deadline: date,
    categories,
    searchPattern,
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
    const handleResize = () => {
      if (window.innerWidth < 680) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      {(isNavBarOpened || !isMobile) && (
        <Filters
          isMobile={isMobile}
          date={date}
          setDate={setDate}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
          categories={categories}
          setCategories={setCategories}
          taskFetchingParams={fetchingParams}
          setIsNavberOpened={setIsNavberOpened}
        />
      )}

      <Tasks
        isMobile={isMobile}
        taskFetchingParams={fetchingParams}
        setSearchPattern={setSearchPattern}
      />
    </div>
  );
};

export default withLoginRedirect(Home);
