import { useState, Dispatch, SetStateAction, FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../../../components/common/Button/Button';
import { Input } from '../../../../../components/common/Input/Input';
import Preloader from '../../../../../components/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { selectProfile } from '../../../../../redux/slices/auth/selectors';
import {
  addCategoryToList,
  updateCategoryInList,
  updateCategoryInTasksList,
} from '../../../../../redux/slices/home/home';
import categoryAPI, { Category } from '../../../../../api/categoryAPI';
import { Status } from '../../../../../types';

import styles from './CategoryForm.module.scss';

interface CategoryFormProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: Category;
}

const CategoryForm: FC<CategoryFormProps> = ({ childProps, toggleActive }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [status, setStatus] = useState(Status.SUCCESS);
  const [categoryError, setCategoryError] = useState('');
  const { _id, title: prevTitle, color: prevColor } = childProps;
  const [color, setColor] = useState(prevColor || '#ffffff');
  const [title, setTittle] = useState(prevTitle || '');

  const userId = useAppSelector(selectProfile)?._id || '';

  useEffect(() => {
    setColor(prevColor || '#ffffff');
    setTittle(prevTitle || '');
  }, [childProps]);

  const submit = async () => {
    setStatus(Status.LOADING);
    const result = _id
      ? await categoryAPI.editCategory({ _id, title, color })
      : await categoryAPI.addCategory({ title, user: userId, color });
    const { message, status, category } = result;
    setStatus(status);
    setCategoryError(message || '');
    if (status === Status.SUCCESS) {
      toggleActive(false);
      if (_id) {
        dispatch(updateCategoryInTasksList({ _id, title, color }));
        dispatch(updateCategoryInList({ _id, title, color }));
      } else {
        dispatch(addCategoryToList(category));
      }
    }
  };

  const cancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      {status === Status.LOADING ? (
        <Preloader />
      ) : (
        <>
          <h3 className={styles.title}>{t('categoryColor')}</h3>
          <input
            data-testid="color-input"
            className={styles.chooseColor}
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <Input
            title={t('title')}
            value={title}
            setValue={setTittle}
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

          {categoryError && <p className={styles.error}>{categoryError}</p>}
        </>
      )}
    </div>
  );
};

export default CategoryForm;
