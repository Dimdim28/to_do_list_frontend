import { useState, Dispatch, SetStateAction, FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../../components/common/Button/Button';
import Preloader from '../../../../components/Preloader/Preloader';
import { Input } from '../../../../components/common/Input/Input';
import taskAPI, { Task, getTask } from '../../../../api/taskAPI';
import { Status } from '../../../../types';
import { truncate } from '../../../../helpers/string';

import styles from './TaskAddingLink.module.scss';
import subTasksAPI from '../../../../api/subTaskAPI';

interface TaskAddingLinkProps {
  toggleActive: Dispatch<SetStateAction<boolean>>;
  childProps: Task & {
    fetchTasks: (params: getTask) => void;
    taskFetchingParams: getTask;
    isForSubTask?: boolean;
  };
}

const TaskAddingLink: FC<TaskAddingLinkProps> = ({
  childProps,
  toggleActive,
}) => {
  const { _id, title, links, fetchTasks, taskFetchingParams, isForSubTask } =
    childProps;

  const [status, setStatus] = useState(Status.SUCCESS);
  const [taskError, setTaskError] = useState('');
  const [url, setUrl] = useState('');

  const { t } = useTranslation();

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
      fetchTasks(taskFetchingParams);
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
