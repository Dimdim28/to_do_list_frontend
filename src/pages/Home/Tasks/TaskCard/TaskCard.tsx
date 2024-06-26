import { useState, Dispatch, SetStateAction, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { Task, getTask } from '../../../../api/taskAPI';
import { humaniseDate, truncate } from '../../../../helpers/string';
import { Checkbox } from '../../../../components/common/Checkbox/Checkbox';
import UserImage from '../../../../components/UserImage/UserImage';
import taskAPI from '../../../../api/taskAPI';

import styles from './TaskCard.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencil,
  faTrash,
  faListCheck,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import subTasksAPI from '../../../../api/subTaskAPI';
import { useAppDispatch } from '../../../../hooks';
import { updateTaskCompletionStatus } from '../../../../redux/slices/home/home';

interface taskProps {
  task: Task;
  setTaskEditing: Dispatch<SetStateAction<boolean>>;
  setTaskProps: Dispatch<
    SetStateAction<
      | {}
      | (Task & {
          taskFetchingParams: getTask;
          isAssignedUser?: boolean;
        })
    >
  >;
  setTaskDeleting: Dispatch<SetStateAction<boolean>>;
  setTaskSharing: Dispatch<SetStateAction<boolean>>;
  setTaskAddingLink: Dispatch<SetStateAction<boolean>>;
  setTaskInfo: Dispatch<SetStateAction<boolean>>;
  taskFetchingParams: getTask;
  setCurrentPage: (page: number) => {};
  length?: number;
  updateTaskStatus: (id: string, isCompleted: boolean) => void;
}

const TaskCard = ({
  task,
  setTaskEditing,
  setTaskProps,
  setTaskDeleting,
  setTaskSharing,
  setTaskAddingLink,
  setTaskInfo,
  taskFetchingParams,
  setCurrentPage,
  updateTaskStatus,
  length,
}: taskProps) => {
  const {
    title,
    description,
    deadline,
    isCompleted,
    categories,
    _id,
    sharedWith,
    links,
    subtasks,
    assigneeId,
    userId,
  } = task;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [completed, setIsCompleted] = useState(isCompleted || false);

  const onChangeCheckBoxCallback = useCallback(() => {
    const toggle = async () => {
      try {
        const result = assigneeId
          ? await subTasksAPI.editSubTask({
              subTaskId: _id,
              isCompleted: !completed,
            })
          : await taskAPI.edittask({
              _id: _id || '',
              isCompleted: !completed,
            });
        if (result.status === 'success') setIsCompleted((prev) => !prev);
        if (assigneeId) {
          dispatch(
            updateTaskCompletionStatus({ id: _id, isCompleted: !completed }),
          );
        }
        updateTaskStatus(_id || '', !completed);
      } catch (e) {
        console.log(e);
      }
    };
    toggle();
  }, []);

  return (
    <div
      className={completed ? styles.completedWrapper : styles.wrapper}
      onClick={() => {
        setTaskProps({ ...task, taskFetchingParams });
        setTaskInfo(true);
      }}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>{title} </h1>
        <Checkbox
          isChecked={completed}
          label=""
          data-testid="checkbox"
          isRounded
          callback={onChangeCheckBoxCallback}
        />
      </div>
      <div className={styles.categoriesWrapper}>
        {categories?.map((el) => {
          const { color, title } = el;
          return (
            <span
              key={el._id}
              style={{ borderColor: color }}
              className={styles.category}
            >
              {title}
            </span>
          );
        })}
      </div>
      <p className={styles.description}>{truncate(description, 80)}</p>

      {assigneeId && (
        <div className={styles.sharedWrapper}>
          <h4 className={styles.sharedTitle}>{t('sharedFrom')}</h4>
          {userId && <UserImage user={userId} />}
          <p className={styles.sharedUsername}>{userId?.username}</p>
        </div>
      )}
      <div className={styles.links}>
        {links && links.length > 0 && (
          <p className={styles.link}>
            {t('linksAttacked')}: {links.length}
          </p>
        )}
      </div>

      <div className={styles.subtasks}>
        {subtasks && subtasks.length > 0 && (
          <p className={styles.subtask}>
            {t('subTasksAmount')}: {subtasks.length}
          </p>
        )}
      </div>
      {deadline && (
        <p className={styles.deadline}>
          {t('deadline')} {humaniseDate(deadline)}
        </p>
      )}
      {sharedWith &&
        sharedWith[0] !== 'already shared' &&
        sharedWith.length > 0 && (
          <div className={styles.username}>
            {t('sharedWith')}: {sharedWith.length}
          </div>
        )}
      <div className={styles.icons}>
        <FontAwesomeIcon
          data-testid="edit-icon"
          className={`${styles.icon} ${styles.pencil}`}
          onClick={(e) => {
            setTaskProps({
              ...task,
              taskFetchingParams,
              isAssignedUser: !!assigneeId,
            });
            setTaskEditing(true);
            e.stopPropagation();
          }}
          color="black"
          fontSize="15px"
          icon={faPencil}
        />
        {links && links.length < 10 && (
          <FontAwesomeIcon
            data-testid="attach-icon"
            className={`${styles.icon} ${styles.attach}`}
            onClick={(e) => {
              setTaskProps({
                ...task,
                isForSubTask: !!assigneeId,
              });
              setTaskAddingLink(true);
              e.stopPropagation();
            }}
            color="black"
            fontSize="15px"
            icon={faPlus}
          />
        )}
        <FontAwesomeIcon
          color="black"
          data-testid="delete-icon"
          fontSize="15px"
          icon={faTrash}
          className={`${styles.icon} ${styles.trash}`}
          onClick={(e) => {
            setTaskProps({
              ...task,
              length,
              isForSubTask: !!assigneeId,
            });
            setTaskDeleting(true);
            e.stopPropagation();
          }}
        />

        {subtasks && subtasks.length < 10 && (
          <FontAwesomeIcon
            color="black"
            data-testid="share-icon"
            fontSize="15px"
            icon={faListCheck}
            className={`${styles.icon} ${styles.share}`}
            onClick={(e) => {
              if (sharedWith && sharedWith[0] === 'already shared') {
                toast.error(
                  'ERROR! You are not the author of this task, you can not share this task!',
                );
                return;
              }
              setTaskProps({
                _id: _id,
                taskFetchingParams,
                isForSubtask: true,
              });
              setTaskSharing(true);
              e.stopPropagation();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TaskCard;
