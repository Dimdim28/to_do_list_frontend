import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SubTask } from '../../../../../api/subTaskAPI';
import { humaniseDate, truncate } from '../../../../../helpers/string';
import { Modal } from '../../../../../components/common/Modal/Modal';
import SubTaskDeleting from './SubTaskDeleting/SubTaskDeleting';
import TaskForm from '../../TaskEditing/TaskForm';
import { getTask } from '../../../../../api/taskAPI';
import UserImage from '../../../../../components/UserImage/UserImage';

import styles from './SubTasks.module.scss';

import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

export interface SubTasksProps {
  subTasks: SubTask[];
  taskId: string;
}

const Status: FC<{ rejected: boolean; isCompleted: boolean }> = ({
  rejected,
  isCompleted,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {rejected ? (
        <p className={styles.subTaskRejected}>
          {rejected ? t('rejected') : null}
        </p>
      ) : (
        <p
          className={
            isCompleted ? styles.subTaskCompleted : styles.subtaskInProgress
          }
        >
          {isCompleted ? t('completedSub') : t('inProgress')}
        </p>
      )}
    </>
  );
};

const SubTasks: FC<SubTasksProps> = ({ subTasks, taskId }) => {
  const { t } = useTranslation();

  const [subTasksArray, setSubTasksArray] = useState<SubTask[]>(subTasks);
  const [activeSubTask, setActiveSubTask] = useState<string>('');
  const [subTaskDeleting, setSubTaskDeleting] = useState<boolean>(false);
  const [subTaskEditing, setSubTaskEditing] = useState<boolean>(false);
  const [subTaskProps, setSubTaskProps] = useState<any>({});

  useEffect(() => {
    setSubTasksArray(subTasks);
  }, [subTasks]);

  // TODO fix className for avatar
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
                <UserImage
                  user={assigneeId}
                  additionalClassname={`${styles.titleSubTaskAvatar} ${
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
                    <UserImage user={assigneeId} />
                    <p className={styles.subTaskUsername}>
                      {assigneeId?.username || 'Anon'}
                    </p>
                  </div>
                  <div className={styles.icons}>
                    <FontAwesomeIcon
                      data-testid="edit-icon"
                      className={`${styles.icon} ${styles.pencil}`}
                      onClick={(e) => {
                        setSubTaskProps({
                          ...el,
                          isForSubtask: true,
                          setSubTasksArray,
                          parentTaskId: taskId,
                        });
                        setSubTaskEditing(true);
                        e.stopPropagation();
                      }}
                      color="black"
                      fontSize="15px"
                      icon={faPencil}
                    />
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
                          setSubTasksArray,
                          parentTaskId: taskId,
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
                  {deadline && `${t('deadline')} ${humaniseDate(deadline)}`}
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
      <Modal
        childProps={subTaskProps}
        ChildComponent={TaskForm}
        active={subTaskEditing}
        setActive={setSubTaskEditing}
      />
    </div>
  );
};

export default SubTasks;
