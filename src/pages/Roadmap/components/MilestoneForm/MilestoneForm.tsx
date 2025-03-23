import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../../components/common/Button/Button';
import { Input } from '../../../../components/common/Input/Input';
import Preloader from '../../../../components/FallBackPreloader/FallBackPreloader';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  addRoadmapMilestone,
  editRoadmapMilestone,
} from '../../../../redux/slices/roadmap/roadmap';
import { selectRoadmapCurrentMilestone } from '../../../../redux/slices/roadmap/selectors';
import { Status } from '../../../../types/shared';

import styles from './MilestoneForm.module.scss';

interface MilestoneFormProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
}

const MilestoneForm: FC<MilestoneFormProps> = ({ toggleActive }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentMilestone = useAppSelector(selectRoadmapCurrentMilestone);

  const [status] = useState(Status.SUCCESS);
  const [categoryError] = useState('');

  const [title, setTittle] = useState(currentMilestone?.title || '');

  useEffect(() => {
    setTittle(currentMilestone?.title || '');
  }, [currentMilestone?.id]);

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
    if (currentMilestone) {
      dispatch(editRoadmapMilestone({ ...currentMilestone, title }));
    } else {
      dispatch(
        addRoadmapMilestone({
          position: 0,
          title,
          id: `${Math.random() * 1000 + 'category' + Math.random() * 100}`,
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

export default MilestoneForm;
