import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/FallBackPreloader/FallBackPreloader';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { deleteRoadmapQuarter } from '../../../../redux/slices/roadmap/roadmap';
import { selectRoadmapCurrentQuarter } from '../../../../redux/slices/roadmap/selectors';
import { Status } from '../../../../types/shared';

import styles from './QuarterDeleting.module.scss';

interface QuarterDeletingProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}

export const QuarterDeleting: FC<QuarterDeletingProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentQuarter = useAppSelector(selectRoadmapCurrentQuarter);

  const [status] = useState(Status.SUCCESS);
  const [categoryError] = useState('');

  const submit = async () => {
    if (!currentQuarter) return;
    // setStatus(Status.LOADING);
    // const result = await categoryAPI.deleteCategory(_id);
    // const { message, status } = result;
    // setStatus(status);
    // setCategoryError(message || '');
    // if (status === Status.SUCCESS) {
    //   dispatch(removeCategoryFromList(_id));
    //   dispatch(removeCategoryFromTasksList(_id));
    toggleActive(false);
    // }
    dispatch(deleteRoadmapQuarter(currentQuarter));
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
            <p>{t('reallyQuarter')}</p>
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
