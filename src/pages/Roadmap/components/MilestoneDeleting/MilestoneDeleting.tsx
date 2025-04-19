import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import roadmapAPI from '../../../../api/roadmapApi';
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
  childProps: { roadmapId: string };
}

export const MilestoneDeleting: FC<MilestoneDeletingProps> = ({
  toggleActive,
  childProps,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentMilestone = useAppSelector(selectRoadmapCurrentMilestone);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async () => {
    if (!currentMilestone) return;

    setIsLoading(true);

    const result = await roadmapAPI.deleteMilestone({
      roadmapId: childProps.roadmapId,
      milestoneId: currentMilestone._id,
    });

    if (result.status === Status.SUCCESS) {
      dispatch(deleteRoadmapMilestone(currentMilestone._id));
      toggleActive(false);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setMessage(result.message);
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
            <p>{t('reallyMilestone')}</p>
            <h3>{truncate(currentMilestone?.title || '', 12)}?</h3>
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
