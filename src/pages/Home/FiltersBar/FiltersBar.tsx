import { Dispatch, SetStateAction, FC } from 'react';

import Filters from './Filters/Filters';
import Categories from './Categories/Categories';

import styles from './FiltersBar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { updateTaskActiveCategories } from '../../../redux/slices/home/home';
import { selectTasksActiveCategories } from '../../../redux/slices/home/selectors';

interface FiltersBarProps {
  isMobile?: boolean;
  setIsNavberOpened?: Dispatch<SetStateAction<boolean>>;
}

const FiltersBar: FC<FiltersBarProps> = ({ isMobile, setIsNavberOpened }) => {
  const dispatch = useAppDispatch();

  const activeCategories = useAppSelector(selectTasksActiveCategories);

  const setCategories = (categories: string[]) => {
    dispatch(updateTaskActiveCategories(categories));
  };

  return (
    <aside
      className={isMobile ? styles.mobileFiltersWrapper : styles.filtersWrapper}
      role="list"
    >
      {isMobile && (
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={styles.close}
          onClick={() => {
            if (setIsNavberOpened) setIsNavberOpened(false);
          }}
        />
      )}
      <Categories
        activeCategories={activeCategories}
        setActiveCategories={setCategories}
      />
      <Filters />
    </aside>
  );
};

export default FiltersBar;
