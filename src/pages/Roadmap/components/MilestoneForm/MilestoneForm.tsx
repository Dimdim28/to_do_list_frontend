import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import roadmapAPI from '../../../../api/roadmapApi';
import Button from '../../../../components/common/Button/Button';
import { Input } from '../../../../components/common/Input/Input';
import Preloader from '../../../../components/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  addRoadmapMilestone,
  editRoadmapMilestone,
} from '../../../../redux/slices/roadmap/roadmap';
import {
  selectRoadmapClickPosition,
  selectRoadmapCurrentMilestone,
} from '../../../../redux/slices/roadmap/selectors';
import { Status } from '../../../../types/shared';

import styles from './MilestoneForm.module.scss';

interface MilestoneFormProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: { roadmapId: string };
}

const MilestoneForm: FC<MilestoneFormProps> = ({
  toggleActive,
  childProps,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentMilestone = useAppSelector(selectRoadmapCurrentMilestone);
  const clickPosition = useAppSelector(selectRoadmapClickPosition);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState(currentMilestone?.title || '');

  useEffect(() => {
    setTitle(currentMilestone?.title || '');
  }, [currentMilestone?._id]);

  const submit = async () => {
    setIsLoading(true);
    setMessage('');

    if (title.length < 3) return;

    if (currentMilestone) {
      const result = await roadmapAPI.updateMilestone({
        roadmapId: childProps.roadmapId,
        milestoneId: currentMilestone._id,
        title,
      });

      if (result.status === Status.SUCCESS) {
        dispatch(editRoadmapMilestone({ ...currentMilestone, title }));
        toggleActive(false);
        setMessage('');
        setIsLoading(false);
      } else {
        setMessage(result.message);
        setIsLoading(false);
      }
    } else {
      const position = clickPosition || 0;

      const result = await roadmapAPI.createMilestone({
        roadmapId: childProps.roadmapId,
        title,
        position,
      });

      if (result.status === Status.SUCCESS) {
        dispatch(addRoadmapMilestone(result.data));
        setTitle('');
        setMessage('');
        toggleActive(false);
        setIsLoading(false);
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
          <Input
            title={t('title')}
            value={title}
            setValue={setTitle}
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

export default MilestoneForm;
