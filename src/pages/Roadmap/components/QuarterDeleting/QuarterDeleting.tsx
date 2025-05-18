import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import roadmapAPI from '../../../../api/roadmapApi';
import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { deleteRoadmapQuarter } from '../../../../redux/slices/roadmap/roadmap';
import { selectRoadmapCurrentQuarter } from '../../../../redux/slices/roadmap/selectors';
import { Status } from '../../../../types/shared';

import styles from './QuarterDeleting.module.scss';

interface QuarterDeletingProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: { roadmapId: string };
}

export const QuarterDeleting: FC<QuarterDeletingProps> = ({
  toggleActive,
  childProps,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentQuarter = useAppSelector(selectRoadmapCurrentQuarter);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async () => {
    if (!currentQuarter) return;
    setIsLoading(true);
    const result = await roadmapAPI.deleteQuarter({
      roadmapId: childProps.roadmapId,
      quarterId: currentQuarter._id,
    });

    if (result.status === Status.SUCCESS) {
      setMessage('');
      dispatch(deleteRoadmapQuarter(currentQuarter));
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
            <p>{t('reallyQuarter')}</p>
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
