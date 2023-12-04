import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SubTask } from '../../../../../api/subTaskAPI';
import { humaniseDate, truncate } from '../../../../../helpers/string';

import styles from './SubTasks.module.scss';

export interface SubTasksProps {
  subTasks: SubTask[];
}

const Status: FC<{ rejected: boolean; isCompleted: boolean }> = ({
  rejected,
  isCompleted,
}) => {
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
          {isCompleted ? 'Completed' : 'In progress'}
        </p>
      )}
    </>
  );
};

const SubTasks: FC<SubTasksProps> = ({ subTasks }) => {
  const { t } = useTranslation();

  const [activeSubTask, setActiveSubTask] = useState<string>('');

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Subtasks</h3>

      <div className={styles.subtasks}>
        {subTasks.map((el) => {
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
                setActiveSubTask(el._id);
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
    </div>
  );
};

export default SubTasks;
