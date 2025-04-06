import { FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import {
  faArrowLeft,
  faArrowRight,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import canbanAPI from '../../../../api/canbanApi';
import UserImage from '../../../../components/UserImage/UserImage';
import { useAppDispatch } from '../../../../hooks';
import {
  reorderColumns,
  setChangeColumnNameModalOpen,
  setDeleteColumnModalOpen,
  setIsTaskInfoModalOpened,
  setProcessingColumnData,
  setSelectedTask,
} from '../../../../redux/slices/canban/canban';
import { Column, SelectedTaskInfo } from '../../../../redux/slices/canban/type';
import { Status } from '../../../../types/shared';
import Tag from '../Tag/Tag';

import styles from './styles.module.scss';

interface ColumnProps {
  column: Column;
  boardId?: string;
  columns: Column[];
  isCreator: boolean;
  index: number;
}
const ColumnComponent: FC<ColumnProps> = ({
  column,
  boardId,
  columns,
  isCreator,
  index,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleTaskClick = (task: SelectedTaskInfo) => {
    dispatch(setIsTaskInfoModalOpened(true));
    dispatch(setSelectedTask(task));
  };

  const handleOpenEditColumnModal = (column: Column) => {
    dispatch(
      setProcessingColumnData({ columnId: column._id, title: column.title }),
    );
    dispatch(setChangeColumnNameModalOpen(true));
  };

  const handleOpenDeleteColumnModal = (column: Column) => {
    dispatch(
      setProcessingColumnData({ columnId: column._id, title: column.title }),
    );
    dispatch(setDeleteColumnModalOpen(true));
  };

  const handleMoveColumn = async (
    column: Column,
    direction: 'left' | 'right',
  ) => {
    if (!boardId) return;

    const currentIndex = columns.findIndex((col) => col._id === column._id);
    const targetIndex =
      direction === 'left' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= columns.length) return;

    const targetOrder = columns[targetIndex].order;

    const result = await canbanAPI.updateColumn({
      boardId,
      columnId: column._id,
      order: targetOrder,
    });

    if (result.status === Status.SUCCESS) {
      dispatch(
        reorderColumns({
          columnId: column._id,
          direction,
        }),
      );
    } else {
      console.error('Failed to move column:', result.message);
    }
  };

  return (
    <div className={styles.column} key={column._id}>
      <div className={styles.columnHeader}>
        {isCreator ? (
          <div className={styles.arrows}>
            {index > 0 && (
              <FontAwesomeIcon
                onClick={() => handleMoveColumn(column, 'left')}
                icon={faArrowLeft}
                className={styles.arrow}
              />
            )}
            {index < columns.length - 1 && (
              <FontAwesomeIcon
                onClick={() => handleMoveColumn(column, 'right')}
                icon={faArrowRight}
                className={styles.arrow}
              />
            )}
          </div>
        ) : null}
        <h3 className={styles.columnTitle}>{column.title}</h3>
        {isCreator ? (
          <div className={styles.icons}>
            <FontAwesomeIcon
              className={`${styles.icon} ${styles.pencil}`}
              onClick={(e) => {
                handleOpenEditColumnModal(column);

                e.stopPropagation();
              }}
              fontSize="15px"
              icon={faPencil}
            />
            <FontAwesomeIcon
              fontSize="15px"
              icon={faTrash}
              className={`${styles.icon} ${styles.trash}`}
              onClick={(e) => {
                handleOpenDeleteColumnModal(column);
                e.stopPropagation();
              }}
            />
          </div>
        ) : null}
      </div>
      <Droppable droppableId={column._id}>
        {(provided) => (
          <div
            className={styles.taskList}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    onClick={() => {
                      handleTaskClick({
                        task: task,
                        columnId: column._id,
                      });
                    }}
                    className={styles.task}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className={styles.taskContent}>
                      <div className={styles.title}>{task.title}</div>
                      <div className={styles.assignedUsers}>
                        {task.assignees
                          ?.slice(0, 3)
                          .map((user) => (
                            <UserImage
                              key={user._id}
                              additionalClassname={styles.userAvatar}
                              user={user}
                            />
                          ))}
                      </div>
                    </div>

                    <div className={styles.tags}>
                      {task.tags.map((tag) => (
                        <Tag tag={tag} key={tag._id} />
                      ))}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button
        className={styles.addTaskButton}
        onClick={() => {
          handleTaskClick({ task: null, columnId: column._id });
        }}
      >
        + {t('addCanBanTask')}
      </button>
    </div>
  );
};

export default ColumnComponent;
