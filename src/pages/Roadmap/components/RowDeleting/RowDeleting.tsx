import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import roadmapAPI from '../../../../api/roadmapApi';
import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/Preloader/Preloader';
import { truncate } from '../../../../helpers/string';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { deleteRoadmapRow } from '../../../../redux/slices/roadmap/roadmap';
import {
  selectRoadmapCurrentCategory,
  selectRoadmapCurrentRow,
} from '../../../../redux/slices/roadmap/selectors';
import { Status } from '../../../../types/shared';

import styles from './RowDeleting.module.scss';

interface RowDeletingProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: { roadmapId: string };
}

export const RowDeleting: FC<RowDeletingProps> = ({
  toggleActive,
  childProps,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentRow = useAppSelector(selectRoadmapCurrentRow);
  const currentCategory = useAppSelector(selectRoadmapCurrentCategory);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async () => {
    if (!currentRow || !currentCategory) return;
    setIsLoading(true);
    const result = await roadmapAPI.deleteRow({
      rowId: currentRow._id,
      roadmapId: childProps.roadmapId,
      categoryId: currentCategory._id,
    });

    if (result.status === Status.SUCCESS) {
      setIsLoading(false);
      setMessage('');
      toggleActive(false);
      dispatch(
        deleteRoadmapRow({
          rowId: currentRow._id,
          categoryId: currentCategory._id,
        }),
      );
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
            <p>{t('reallyRow')}</p>
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
