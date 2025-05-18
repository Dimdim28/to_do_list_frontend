import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import subTasksAPI from '../../../../api/subTaskAPI';
import taskAPI from '../../../../api/taskAPI';
import Button from '../../../../components/common/Button/Button';
import { Input } from '../../../../components/common/Input/Input';
import Preloader from '../../../../components/Preloader/Preloader';
import { truncate } from '../../../../helpers/string';
import { useAppDispatch } from '../../../../hooks';
import { addLinkToTask } from '../../../../redux/slices/home/home';
import { Task } from '../../../../types/entities/Task';
import { Status } from '../../../../types/shared';

import styles from './TaskAddingLink.module.scss';

interface TaskAddingLinkProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: Task & {
    isForSubTask?: boolean;
  };
}

const TaskAddingLink: FC<TaskAddingLinkProps> = ({
  childProps,
  toggleActive,
}) => {
  const { _id, title, links, isForSubTask } = childProps;

  const [status, setStatus] = useState(Status.SUCCESS);
  const [taskError, setTaskError] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl('');
  }, [childProps]);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const submit = async () => {
    setStatus(Status.LOADING);
    const result = isForSubTask
      ? await subTasksAPI.addLinkToSubTask(_id, links || [], url)
      : await taskAPI.addLinkToTask(_id, links || [], url);
    const { message, status } = result;
    setStatus(status);
    setTaskError(message || '');
    if (status === Status.SUCCESS) {
      toggleActive(false);
      dispatch(addLinkToTask({ id: _id, link: url }));
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
          <h3 className={styles.title}>
            {t('additingLink')}{' '}
            <p className={styles.name}>{truncate(title, 12)}</p>
          </h3>
          <Input title={t('link')} type="text" value={url} setValue={setUrl} />
          <div className={styles.actions}>
            <Button text={t('cancel')} callback={cancel} class="cancel" />
            <Button text={t('submit')} callback={submit} class="submit" />
          </div>
          {taskError && <p className={styles.error}>{taskError}</p>}
        </>
      )}
    </div>
  );
};

export default TaskAddingLink;
