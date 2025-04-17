import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import roadmapAPI from '../../../../api/roadmapApi';
import Button from '../../../../components/common/Button/Button';
import { Input } from '../../../../components/common/Input/Input';
import Preloader from '../../../../components/Preloader/Preloader';
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
  childProps: { roadmapId: string };
}

const CategoryForm: FC<CategoryFormProps> = ({ toggleActive, childProps }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentCategory = useAppSelector(selectRoadmapCurrentCategory);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [color, setColor] = useState(currentCategory?.color || '#ffffff');
  const [title, setTittle] = useState(currentCategory?.title || '');

  useEffect(() => {
    setColor(currentCategory?.color || '#ffffff');
    setTittle(currentCategory?.title || '');
  }, [currentCategory?._id]);

  const submit = async () => {
    setIsLoading(true);
    if (currentCategory) {
      const result = await roadmapAPI.updateCategory({
        title,
        color,
        categoryId: currentCategory._id,
        roadmapId: childProps.roadmapId,
      });

      if (result.status === Status.SUCCESS) {
        setIsLoading(false);
        setMessage('');
        toggleActive(false);
        dispatch(
          editRoadmapCategory({ color, title, id: currentCategory._id }),
        );
      } else {
        setMessage(result.message);
        setIsLoading(false);
      }
    } else {
      const result = await roadmapAPI.createCategory({
        title,
        color,
        roadmapId: childProps.roadmapId,
      });

      if (result.status === Status.SUCCESS) {
        setIsLoading(false);
        setMessage('');
        toggleActive(false);

        dispatch(
          addRoadmapCategory({
            color,
            title,
            _id: result.data._id,
            rows: [
              {
                _id: `${
                  Math.random() * 1000 + 'category' + Math.random() * 100
                }`,
                tasks: [],
                title: 'row',
              },
            ],
          }),
        );
      } else {
        setMessage(result.message);
        setIsLoading(false);
      }
    }
  };

  const cancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
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

          {message && <p className={styles.error}>{message}</p>}
        </>
      )}
    </div>
  );
};

export default CategoryForm;
