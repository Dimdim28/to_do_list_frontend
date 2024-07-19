import { Dispatch, FC,SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import categoryAPI from '../../../../../api/categoryAPI';
import Button from '../../../../../components/common/Button/Button';
import Preloader from '../../../../../components/Preloader/Preloader';
import { truncate } from '../../../../../helpers/string';
import { useAppDispatch } from '../../../../../hooks';
import {
  removeCategoryFromList,
  removeCategoryFromTasksList,
} from '../../../../../redux/slices/home/home';
import { Category } from '../../../../../types/entities/Category';
import { Status } from '../../../../../types/shared';

import styles from './CategoryDeleting.module.scss';

interface CategoryDeletingProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: Category;
}

export const CategoryDeleting: FC<CategoryDeletingProps> = ({
  toggleActive,
  childProps,
}) => {
  const { _id, title, color } = childProps;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [status, setStatus] = useState(Status.SUCCESS);
  const [categoryError, setCategoryError] = useState('');

  const submit = async () => {
    setStatus(Status.LOADING);
    const result = await categoryAPI.deleteCategory(_id);
    const { message, status } = result;
    setStatus(status);
    setCategoryError(message || '');
    if (status === Status.SUCCESS) {
      dispatch(removeCategoryFromList(_id));
      dispatch(removeCategoryFromTasksList(_id));
      toggleActive(false);
    }
  };

  const cancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      {status === Status.LOADING ? (
        <Preloader data-testid="preloader" />
      ) : (
        <>
          <div className={styles.modalContent}>
            <p>{t('reallyСategory')}</p>
            <h3 style={{ color }}>{truncate(title, 12)}</h3>
          </div>
          <div className={styles.buttons}>
            <Button text={t('no')} callback={cancel} class="cancel" />
            <Button text={t('yes')} callback={submit} class="submit" />
          </div>
          {categoryError && <p className={styles.error}>{categoryError}</p>}
        </>
      )}
    </div>
  );
};
