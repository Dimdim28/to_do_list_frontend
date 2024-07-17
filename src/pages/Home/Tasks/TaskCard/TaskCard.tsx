import { Dispatch, SetStateAction, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  faListCheck,
  faPencil,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import subTasksAPI from '../../../../api/subTaskAPI';
import taskAPI from '../../../../api/taskAPI';
import { Checkbox } from '../../../../components/common/Checkbox/Checkbox';
import UserImage from '../../../../components/UserImage/UserImage';
import { humaniseDate, truncate } from '../../../../helpers/string';
import { useAppDispatch } from '../../../../hooks';
import {
  updateSubTaskCompletionStatusInSubtasksList,
  updateTaskCompletionStatus,
} from '../../../../redux/slices/home/home';
import ROUTES from '../../../../routes';
import { SharedTask } from '../../../../types/entities/SharedTask';
import { Task } from '../../../../types/entities/Task';

import styles from './TaskCard.module.scss';

interface taskProps {
  task: Task | SharedTask;
  setTaskEditing: Dispatch<SetStateAction<boolean>>;
  setTaskProps: Dispatch<
    SetStateAction<
      | object
      | (Task & {
          isAssignedUser?: boolean;
        })
    >
  >;
  setTaskDeleting: Dispatch<SetStateAction<boolean>>;
  setTaskSharing: Dispatch<SetStateAction<boolean>>;
  setTaskAddingLink: Dispatch<SetStateAction<boolean>>;
  setTaskInfo: Dispatch<SetStateAction<boolean>>;
  setCurrentPage: (page: number) => void;
  length?: number;
}

const TaskCard = ({
  task,
  setTaskEditing,
  setTaskProps,
  setTaskDeleting,
  setTaskSharing,
  setTaskAddingLink,
  setTaskInfo,
  length,
}: taskProps) => {
  const {
    title,
    description,
    deadline,
    isCompleted,
    categories,
    _id,
    links,
    type,
  } = task;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToProfile = (id: string) => {
    navigate(`${ROUTES.PROFILE}/${id}`);
  };

  const onChangeCheckBoxCallback = useCallback(() => {
    const toggle = async () => {
      try {
        const result =
          type === 'subtask'
            ? await subTasksAPI.editSubTask({
                subTaskId: _id,
                isCompleted: !isCompleted,
              })
            : await taskAPI.edittask({
                _id: _id || '',
                isCompleted: !isCompleted,
              });
        if (result.status === 'success') {
          dispatch(
            updateTaskCompletionStatus({ id: _id, isCompleted: !isCompleted }),
          );
          if (type === 'subtask') {
            dispatch(
              updateSubTaskCompletionStatusInSubtasksList({
                subTaskId: _id,
                isCompleted: !isCompleted,
              }),
            );
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    toggle();
  }, [isCompleted]);

  return (
    <div
      className={isCompleted ? styles.completedWrapper : styles.wrapper}
      onClick={() => {
        setTaskProps({ ...task });
        setTaskInfo(true);
      }}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>{title} </h1>
        <Checkbox
          isChecked={isCompleted}
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

      {(task as SharedTask).creator && (
        <div className={styles.sharedWrapper}>
          <h4 className={styles.sharedTitle}>{t('sharedFrom')}</h4>
          {(task as SharedTask).creator && (
            <UserImage
              user={(task as SharedTask).creator}
              onAvatarClick={(user) => goToProfile(user._id)}
            />
          )}
          <p className={styles.sharedUsername}>
            {(task as SharedTask).creator?.username}
          </p>
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
        {(task as Task).subtasks && (task as Task).subtasks.length > 0 && (
          <p className={styles.subtask}>
            {t('subTasksAmount')}: {(task as Task).subtasks.length}
          </p>
        )}
      </div>
      {deadline && (
        <p className={styles.deadline}>
          {t('deadline')} {humaniseDate(deadline)}
        </p>
      )}
      <div className={styles.icons}>
        <FontAwesomeIcon
          data-testid="edit-icon"
          className={`${styles.icon} ${styles.pencil}`}
          onClick={(e) => {
            setTaskProps({
              ...task,
              isAssignedUser: !!(task as SharedTask).creator,
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
                isForSubTask: !!(task as SharedTask).creator,
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
              isForSubTask: !!(task as SharedTask).creator,
            });
            setTaskDeleting(true);
            e.stopPropagation();
          }}
        />

        {(task as Task).subtasks && (task as Task).subtasks.length < 10 && (
          <FontAwesomeIcon
            color="black"
            data-testid="share-icon"
            fontSize="15px"
            icon={faListCheck}
            className={`${styles.icon} ${styles.share}`}
            onClick={(e) => {
              setTaskProps({
                _id: _id,
                parentTaskId: _id,
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
