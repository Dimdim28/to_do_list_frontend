import { useEffect, useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import withLoginRedirect from '../../hoc/withLoginRedirect';
import { useAppDispatch } from '../../hooks';
import { clearCategories } from '../../redux/slices/home/home';
import { fetchCategories } from '../../redux/slices/home/thunk';

import Filters from './FiltersBar/FiltersBar';
import Tasks from './Tasks/Tasks';

import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useAppDispatch();

  const [isMobile, setIsMobile] = useState(false);
  const [isNavBarOpened, setIsNavberOpened] = useState(true);

  useEffect(() => {
    dispatch(fetchCategories({ page: 1 }));
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
        <Filters isMobile={isMobile} setIsNavberOpened={setIsNavberOpened} />
      )}

      <Tasks isMobile={isMobile} />
    </div>
  );
};

export default withLoginRedirect(Home);
