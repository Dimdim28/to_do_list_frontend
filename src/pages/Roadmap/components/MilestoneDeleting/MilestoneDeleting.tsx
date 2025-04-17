import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/Preloader/Preloader';
import { truncate } from '../../../../helpers/string';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { deleteRoadmapMilestone } from '../../../../redux/slices/roadmap/roadmap';
import { selectRoadmapCurrentMilestone } from '../../../../redux/slices/roadmap/selectors';
import { Status } from '../../../../types/shared';

import styles from './MilestoneDeleting.module.scss';

interface MilestoneDeletingProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}

export const MilestoneDeleting: FC<MilestoneDeletingProps> = ({
  toggleActive,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentMilestone = useAppSelector(selectRoadmapCurrentMilestone);

  const [status] = useState(Status.SUCCESS);
  const [categoryError] = useState('');

  const submit = async () => {
    if (!currentMilestone) return;
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
    dispatch(deleteRoadmapMilestone(currentMilestone._id));
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
            <p>{t('reallyMilestone')}</p>
            <h3>{truncate(currentMilestone?.title || '', 12)}?</h3>
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
