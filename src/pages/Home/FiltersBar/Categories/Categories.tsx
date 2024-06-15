import { useState, Dispatch, SetStateAction, FC, UIEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '../../../../components/common/Modal/Modal';
import Preloader from '../../../../components/Preloader/Preloader';
import CategoryForm from './CategoryForm/CategoryForm';
import Category from './Category/Category';
import { CategoryDeleting } from './CategoryDeleting/CategoryDeleting';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesStatus,
  selectCategoryCurrentPage,
  selectCategoryTotalPages,
} from '../../../../redux/slices/home/selectors';
import { fetchCategories } from '../../../../redux/slices/home/thunk';
import { getTask } from '../../../../api/taskAPI';

import styles from './Categories.module.scss';

interface CategoryProps {
  isForTask?: boolean;
  activeCategories: string[];
  setActiveCategories: Dispatch<SetStateAction<string[]>>;
  taskFetchingParams: getTask;
}
const Categories: FC<CategoryProps> = ({
  isForTask,
  activeCategories,
  setActiveCategories,
  taskFetchingParams,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [categoryEditing, setCategoryEditing] = useState(false);
  const [categoryProps, setCategoryProps] = useState({});
  const [categoryDeleting, setCategoryDeleting] = useState(false);

  const categories = useAppSelector(selectCategories);
  const status = useAppSelector(selectCategoriesStatus);
  const currentPage = useAppSelector(selectCategoryCurrentPage);
  const totalPages = useAppSelector(selectCategoryTotalPages);
  const message = useAppSelector(selectCategoriesError);

  const loadMore = () => {
    const newPage = 1 + currentPage;
    dispatch(fetchCategories({ page: newPage }));
  };

  const handleCategoriesScroll = (e: UIEvent<HTMLElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const isScrolled = scrollHeight === scrollTop + clientHeight;
    if (status !== 'loading' && currentPage < totalPages && isScrolled)
      loadMore();
  };

  return (
    <>
      <section
        className={
          isForTask ? styles.categoriesWrapperForTask : styles.categoriesWrapper
        }
      >
        {!isForTask && <h3>{t('categories')}</h3>}
        <div
          className={isForTask ? styles.categoriesForTask : styles.categories}
          onScroll={handleCategoriesScroll}
        >
          {categories.length === 0 && status === 'success' ? (
            <p className={styles.noCategories}>{t('noCategories')}</p>
          ) : (
            categories.map((el, id) => (
              <Category
                {...el}
                key={id}
                setCategoryEditing={setCategoryEditing}
                setCategoryInfo={setCategoryProps}
                setCategoryDeleting={setCategoryDeleting}
                isForTask={isForTask}
                setActiveCategories={setActiveCategories}
                isActive={
                  !!activeCategories.find((category) => category === el._id)
                }
                taskFetchingParams={taskFetchingParams}
              />
            ))
          )}
          {status === 'loading' && <Preloader />}
        </div>
        <p
          className={styles.addCategory}
          onClick={() => {
            setCategoryProps({ ...taskFetchingParams });
            setCategoryEditing(true);
          }}
        >
          {t('addCategory')}
        </p>
        {message === 'undefined' ? (
          <p className={styles.categoriesError}> {t('serverError')}</p>
        ) : message ? (
          <p className={styles.categoriesError}>{message}</p>
        ) : null}
      </section>
      <Modal
        active={categoryEditing}
        setActive={setCategoryEditing}
        ChildComponent={CategoryForm}
        childProps={categoryProps}
      />
      <Modal
        active={categoryDeleting}
        setActive={setCategoryDeleting}
        ChildComponent={CategoryDeleting}
        childProps={categoryProps}
      />
    </>
  );
};

export default Categories;
