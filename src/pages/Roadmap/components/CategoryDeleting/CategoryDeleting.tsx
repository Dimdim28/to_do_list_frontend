import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import roadmapAPI from '../../../../api/roadmapApi';
import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/Preloader/Preloader';
import { truncate } from '../../../../helpers/string';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { deleteRoadmapCategory } from '../../../../redux/slices/roadmap/roadmap';
import { selectRoadmapCurrentCategory } from '../../../../redux/slices/roadmap/selectors';
import { Status } from '../../../../types/shared';

import styles from './CategoryDeleting.module.scss';

interface CategoryDeletingProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: { roadmapId: string };
}

export const CategoryDeleting: FC<CategoryDeletingProps> = ({
  toggleActive,
  childProps,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentCategory = useAppSelector(selectRoadmapCurrentCategory);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async () => {
    if (!currentCategory) return;
    setIsLoading(true);
    const result = await roadmapAPI.deleteCategory({
      categoryId: currentCategory._id,
      roadmapId: childProps.roadmapId,
    });

    if (result.status === Status.SUCCESS) {
      setMessage('');
      dispatch(deleteRoadmapCategory(currentCategory._id));
      setIsLoading(false);
      toggleActive(false);
    } else {
      setMessage(result.message);
      setIsLoading(false);
    }
  };

  const cancel = () => {
    toggleActive(false);
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Preloader data-testid="preloader" />
      ) : (
        <>
          <div className={styles.modalContent}>
            <p>{t('reallyСategory')}</p>
            <h3 style={{ color: currentCategory?.color }}>
              {truncate(currentCategory?.title || '', 12)}?
            </h3>
          </div>
          <div className={styles.buttons}>
            <Button text={t('no')} callback={cancel} class="cancel" />
            <Button text={t('yes')} callback={submit} class="submit" />
          </div>
          {message && <p className={styles.error}>{message}</p>}
        </>
      )}
    </div>
  );
};
