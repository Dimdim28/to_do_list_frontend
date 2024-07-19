import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from '../../../../../components/common/Modal/Modal';
import UserImage from '../../../../../components/UserImage/UserImage';
import { humaniseDate, truncate } from '../../../../../helpers/string';
import ROUTES from '../../../../../routes';
import { SubTask } from '../../../../../types/entities/SubTask';
import TaskForm from '../../TaskEditing/TaskForm';

import SubTaskDeleting from './SubTaskDeleting/SubTaskDeleting';

import styles from './SubTasks.module.scss';

export interface SubTasksProps {
  subTasks: SubTask[];
  taskId: string;
}

const Status: FC<{
  isRejected: boolean;
  isCompleted: boolean;
  isConfirmed: boolean;
}> = ({ isRejected, isCompleted, isConfirmed }) => {
  const { t } = useTranslation();

  if (isRejected) {
    return <p className={styles.subTaskRejected}>{t('rejected')}</p>;
  }
  if (!isConfirmed) {
    return <p className={styles.subTaskIgnored}>{t('ignored')}</p>;
  }
  if (isCompleted) {
    return <p className={styles.subTaskCompleted}>{t('completedSub')}</p>;
  }

  return <p className={styles.subTaskInProgress}>{t('inProgress')}</p>;
};

const SubTasks: FC<SubTasksProps> = ({ subTasks, taskId }) => {
  const { t } = useTranslation();

  const [subTasksArray, setSubTasksArray] = useState<SubTask[]>(subTasks);
  const [activeSubTask, setActiveSubTask] = useState<string>('');
  const [subTaskDeleting, setSubTaskDeleting] = useState<boolean>(false);
  const [subTaskEditing, setSubTaskEditing] = useState<boolean>(false);
  const [subTaskProps, setSubTaskProps] = useState<any>({});

  const goToProfile = (id: string) => {
    window.open(`${ROUTES.PROFILE}/${id}`, '_blank');
  };

  useEffect(() => {
    setSubTasksArray(subTasks);
  }, [subTasks]);

  if (!subTasksArray.length) return null;
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
            isRejected,
            isConfirmed,
            assignee,
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
                  onAvatarClick={(user) => goToProfile(user._id)}
                  user={assignee}
                  additionalClassname={`${styles.titleSubTaskAvatar} ${
                    activeSubTask === el._id
                      ? styles.titleSubTaskAvatarActive
                      : ''
                  }`}
                />

                <p className={styles.subTaskTitle}>{truncate(title, 20)}</p>
                <Status
                  isRejected={isRejected}
                  isConfirmed={isConfirmed}
                  isCompleted={isCompleted}
                />
              </div>
              <div
                className={`${styles.subTaskInfo} ${
                  activeSubTask === el._id ? styles.activeSubTaskInfo : ''
                }`}
              >
                <div className={styles.line}>
                  <div className={styles.subTaskUser}>
                    <UserImage
                      user={assignee}
                      onAvatarClick={(user) => goToProfile(user._id)}
                    />
                    <p className={styles.subTaskUsername}>
                      {assignee?.username || 'Anon'}
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
