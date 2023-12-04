import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SubTask } from '../../../../../api/subTaskAPI';
import { humaniseDate, truncate } from '../../../../../helpers/string';
import { Modal } from '../../../../../components/common/Modal/Modal';
import SubTaskDeleting from './SubTaskDeleting/SubTaskDeleting';
import { getTask } from '../../../../../api/taskAPI';

import styles from './SubTasks.module.scss';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

export interface SubTasksProps {
  subTasks: SubTask[];
  fetchTasks: (params: getTask) => void;
  taskFetchingParams: getTask;
}

const Status: FC<{ rejected: boolean; isCompleted: boolean }> = ({
  rejected,
  isCompleted,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {rejected ? (
        <p className={styles.subTaskRejected}>{rejected ? 'Rejected' : null}</p>
      ) : (
        <p
          className={
            isCompleted ? styles.subTaskCompleted : styles.subtaskInProgress
          }
        >
          {isCompleted ? t('completed') : t('inProgress')}
        </p>
      )}
    </>
  );
};

const SubTasks: FC<SubTasksProps> = ({
  subTasks,
  fetchTasks,
  taskFetchingParams,
}) => {
  const { t } = useTranslation();

  const [subTasksArray, setSubTasksArray] = useState<SubTask[]>(subTasks);
  const [activeSubTask, setActiveSubTask] = useState<string>('');
  const [subTaskDeleting, setSubTaskDeleting] = useState<boolean>(false);
  const [subTaskProps, setSubTaskProps] = useState<any>({});
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{t('subtasks')}</h3>

      <div className={styles.subtasks}>
        {subTasksArray.map((el) => {
          const {
            title,
            isCompleted,
            deadline,
            rejected,
            assigneeId,
            description,
          } = el;

          return (
            <div
              className={styles.subTask}
              key={el._id}
              onClick={() => {
                setActiveSubTask((subtask) =>
                  el._id === subtask ? '' : el._id,
                );
              }}
            >
              <div className={styles.subTaskHeader}>
                <img
                  src={assigneeId.avatar.url}
                  alt={assigneeId.username}
                  className={`${styles.subTaskUserAvatar} ${
                    styles.titleSubTaskAvatar
                  } ${
                    activeSubTask === el._id
                      ? styles.titleSubTaskAvatarActive
                      : ''
                  }`}
                />
                <p className={styles.subTaskTitle}>{truncate(title, 20)}</p>
                <Status rejected={rejected} isCompleted={isCompleted} />
              </div>
              <div
                className={`${styles.subTaskInfo} ${
                  activeSubTask === el._id ? styles.activeSubTaskInfo : ''
                }`}
              >
                <div className={styles.line}>
                  <div className={styles.subTaskUser}>
                    <img
                      src={assigneeId.avatar.url}
                      alt={assigneeId.username}
                      className={styles.subTaskUserAvatar}
                    />
                    <p className={styles.subTaskUsername}>
                      {assigneeId.username}
                    </p>
                  </div>
                  <div className={styles.icons}>
                    <FontAwesomeIcon
                      color="black"
                      data-testid="delete-icon"
                      fontSize="15px"
                      icon={faTrash}
                      className={`${styles.icon} ${styles.trash}`}
                      onClick={(e) => {
                        setSubTaskProps({
                          subTaskId: el._id,
                          title: el.title,
                          fetchTasks,
                          taskFetchingParams,
                          setSubTasksArray,
                        });
                        setSubTaskDeleting(true);
                        e.stopPropagation();
                      }}
                    />
                  </div>
                </div>
                <p className={styles.subTaskDescription}>
                  {truncate(description, 30)}
                </p>
                <p className={styles.subTaskDeadline}>
                  {deadline && `${t('deadline')} : ${humaniseDate(deadline)}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        childProps={subTaskProps}
        ChildComponent={SubTaskDeleting}
        active={subTaskDeleting}
        setActive={setSubTaskDeleting}
      />
    </div>
  );
};

export default SubTasks;
