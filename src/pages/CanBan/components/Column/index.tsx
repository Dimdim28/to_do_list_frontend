import React, { useEffect, useRef, useState } from 'react';
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
import { useDrag } from '../../../../helpers/DragContext';
import { useAppDispatch } from '../../../../hooks';
import {
  moveTask,
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

const SCROLL_THRESHOLD = 40;
const SCROLL_SPEED = 5;

interface ColumnProps {
  column: Column;
  boardId?: string;
  columns: Column[];
  isCreator: boolean;
  index: number;
}

const ColumnComponent: React.FC<ColumnProps> = ({
  column,
  boardId,
  columns,
  isCreator,
  index,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const taskListRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { isDragging, setIsDragging, draggingTaskId, setDraggingTaskId } =
    useDrag();

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
      dispatch(reorderColumns({ columnId: column._id, direction }));
    } else {
      console.error('Failed to move column:', result.message);
    }
  };

  const onTaskDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string,
    sourceIndex: number,
  ) => {
    setTimeout(() => {
      setIsDragging(true);
      setDraggingTaskId(taskId);
    }, 0);

    const data = JSON.stringify({
      taskId,
      sourceColId: column._id,
      sourceIndex,
      offsetY: e.clientY,
    });
    e.dataTransfer.setData('application/json', data);
  };

  const onTaskDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!taskListRef.current) return;

    const list = taskListRef.current;
    const { top, bottom } = list.getBoundingClientRect();
    const mouseY = e.clientY;

    if (mouseY - top < SCROLL_THRESHOLD) {
      list.scrollTop -= SCROLL_SPEED;
    } else if (bottom - mouseY < SCROLL_THRESHOLD) {
      list.scrollTop += SCROLL_SPEED;
    }

    const children = Array.from(list.children).filter(
      (child) => !child.classList.contains(styles.placeholder),
    );

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const rect = child.getBoundingClientRect();
      if (mouseY < rect.top + rect.height / 2) {
        setHoveredIndex(i);
        return;
      }
    }

    setHoveredIndex(column.tasks.length);
  };

  const onTaskDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData('application/json');
    if (!raw) return;
    const { taskId, sourceColId, sourceIndex } = JSON.parse(raw);

    const currentTasks = column.tasks.filter((t) => t._id !== draggingTaskId);
    const maxIndex = currentTasks.length;

    let destinationIndex = hoveredIndex ?? maxIndex;
    if (destinationIndex > maxIndex) {
      destinationIndex = maxIndex;
    }

    setHoveredIndex(null);
    setIsDragging(false);
    setDraggingTaskId(null);

    dispatch(
      moveTask({
        sourceIndex,
        destinationIndex,
        sourceColId,
        destColId: column._id,
      }),
    );

    if (boardId) {
      if (sourceColId === column._id) {
        if (sourceIndex !== destinationIndex) {
          canbanAPI.updateTask({
            taskId,
            boardId,
            columnId: column._id,
            order: destinationIndex,
          });
        }
      } else {
        canbanAPI.moveTaskToAnotherColumn({
          taskId,
          boardId,
          columnId: sourceColId,
          targetColumnId: column._id,
          order: destinationIndex,
        });
      }
    }
  };

  const onDragLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    const handleGlobalDragEnd = () => {
      setIsDragging(false);
      setDraggingTaskId(null);
    };

    document.addEventListener('dragend', handleGlobalDragEnd);
    return () => {
      document.removeEventListener('dragend', handleGlobalDragEnd);
    };
  }, []);

  const renderTasksWithPlaceholder = () => {
    const totalTasks = column.tasks.length;
    const filteredTasks = column.tasks.filter(
      (task) => task._id !== draggingTaskId,
    );
    const tasksWithPlaceholder = [...filteredTasks];

    if (
      hoveredIndex !== null &&
      hoveredIndex >= 0 &&
      hoveredIndex <= totalTasks
    ) {
      tasksWithPlaceholder.splice(hoveredIndex, 0, {
        _id: '__placeholder__',
      } as any);
    }

    return tasksWithPlaceholder.map((task, idx) => {
      if (task._id === '__placeholder__') {
        return <div key={`ph-${idx}`} className={styles.placeholder} />;
      }

      const isBeingDragged = isDragging && draggingTaskId === task._id;

      return (
        <div
          key={task._id}
          className={styles.task}
          draggable
          onDragStart={(e) => onTaskDragStart(e, task._id, idx)}
          onClick={() => handleTaskClick({ task, columnId: column._id })}
          style={{
            pointerEvents: isDragging ? 'none' : 'all',
            opacity: isBeingDragged ? 0 : 1,
            visibility: isBeingDragged ? 'hidden' : 'visible',
            height: isBeingDragged ? 0 : undefined,
            margin: isBeingDragged ? 0 : undefined,
            padding: isBeingDragged ? 0 : undefined,
            overflow: isBeingDragged ? 'hidden' : undefined,
          }}
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
      );
    });
  };

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        {isCreator && (
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
        )}
        <h3 className={styles.columnTitle}>{column.title}</h3>
        {isCreator && (
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
        )}
      </div>
      <div
        className={styles.taskList}
        ref={taskListRef}
        onDragOver={onTaskDragOver}
        onDrop={onTaskDrop}
        onDragLeave={onDragLeave}
      >
        {renderTasksWithPlaceholder()}
      </div>
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
