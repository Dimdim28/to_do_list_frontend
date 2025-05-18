import { Dispatch, FC, SetStateAction } from 'react';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { updateTaskActiveCategories } from '../../../redux/slices/home/home';
import { selectTasksActiveCategories } from '../../../redux/slices/home/selectors';
import { Category } from '../../../types/entities/Category';

import Categories from './Categories/Categories';
import Filters from './Filters/Filters';

import styles from './FiltersBar.module.scss';

interface FiltersBarProps {
  isMobile?: boolean;
  setIsNavberOpened?: Dispatch<SetStateAction<boolean>>;
}

const FiltersBar: FC<FiltersBarProps> = ({ isMobile, setIsNavberOpened }) => {
  const dispatch = useAppDispatch();

  const activeCategories = useAppSelector(selectTasksActiveCategories);

  const setCategories = (categories: Category[]) => {
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
