import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../../components/common/Button/Button';
import { Input } from '../../../../components/common/Input/Input';
import Preloader from '../../../../components/FallBackPreloader/FallBackPreloader';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  addRoadmapCategory,
  editRoadmapCategory,
} from '../../../../redux/slices/roadmap/roadmap';
import { selectRoadmapCurrentCategory } from '../../../../redux/slices/roadmap/selectors';
import { Status } from '../../../../types/shared';

import styles from './CategoryForm.module.scss';

interface CategoryFormProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}

const CategoryForm: FC<CategoryFormProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentCategory = useAppSelector(selectRoadmapCurrentCategory);

  const [status] = useState(Status.SUCCESS);
  const [categoryError] = useState('');

  const [color, setColor] = useState(currentCategory?.color || '#ffffff');
  const [title, setTittle] = useState(currentCategory?.title || '');

  useEffect(() => {
    setColor(currentCategory?.color || '#ffffff');
    setTittle(currentCategory?.title || '');
  }, [currentCategory?.id]);

  const submit = async () => {
    // setStatus(Status.LOADING);
    // const result = _id
    //   ? await categoryAPI.editCategory({ _id, title, color })
    //   : await categoryAPI.addCategory({ title, user: userId, color });
    // const { message, status, category } = result;
    // setStatus(status);
    // setCategoryError(message || '');
    // if (status === Status.SUCCESS) {
    toggleActive(false);
    //   if (_id) {
    //     dispatch(updateCategoryInTasksList({ _id, title, color }));
    //     dispatch(updateCategoryInList({ _id, title, color }));
    //   } else {
    //     dispatch(addCategoryToList(category));
    //   }
    // }
    if (currentCategory) {
      dispatch(editRoadmapCategory({ color, title, id: currentCategory.id }));
    } else {
      dispatch(
        addRoadmapCategory({
          color,
          title,
          id: `${Math.random() * 1000 + 'category' + Math.random() * 100}`,
          rows: [
            {
              id: `${Math.random() * 1000 + 'category' + Math.random() * 100}`,
              tasks: [],
              title: 'row',
            },
          ],
        }),
      );
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
