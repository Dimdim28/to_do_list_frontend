import { FC, useEffect, useRef, useState } from 'react';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import roadmapAPI from '../../../../api/roadmapApi';
import { useAppDispatch } from '../../../../hooks';
import {
  setRoadmapCurrentCategory,
  setRoadmapCurrentRow,
  setRoadmapCurrentTask,
  setRoadmapIsDeletingTaskOpened,
  setRoadmapIsEditingTaskOpened,
  updateRoadmapTaskInCategory,
} from '../../../../redux/slices/roadmap/roadmap';
import { Category, Row, Task } from '../../../../redux/slices/roadmap/type';

import styles from './styles.module.scss';

interface TaskProps {
  totalQuarters: number;
  task: Task;
  category: Category;
  row: Row;
  allTasksInRow: Task[];
  roadmapContentWidth: number;
  roadmapId: string;
}

const TaskComponent: FC<TaskProps> = ({
  totalQuarters,
  task,
  row,
  category,
  allTasksInRow,
  roadmapContentWidth,
  roadmapId,
}) => {
  const dispatch = useAppDispatch();

  const [localTask, setLocalTask] = useState(task);
  const localTaskRef = useRef(task);

  const resizingRef = useRef<{
    side: 'start' | 'end';
    initialX: number;
    initialValue: number;
    isResizing: boolean;
  } | null>(null);

  const progressResizingRef = useRef<{
    initialX: number;
    initialProgress: number;
    isResizing: boolean;
  } | null>(null);

  const categoryId = category._id;
  const categoryColor = category.color;
  const rowId = row._id;

  const onResizeStart = (e: React.MouseEvent, side: 'start' | 'end') => {
    e.stopPropagation();
    e.preventDefault();
    resizingRef.current = {
      side,
      initialX: e.clientX,
      initialValue: localTask[side],
      isResizing: true,
    };
    document.addEventListener('mousemove', onResizeMove);
    document.addEventListener('mouseup', onResizeEnd);
  };

  const onResizeMove = (e: MouseEvent) => {
    const info = resizingRef.current;
    if (!info || !info.isResizing) return;
    e.preventDefault();
    const deltaPx = e.clientX - info.initialX;
    const deltaValue = (deltaPx / roadmapContentWidth) * (totalQuarters * 100);
    const newValue = Math.round(info.initialValue + deltaValue);
    const maxValue = totalQuarters * 100;
    if (newValue < 0 || newValue > maxValue) return;
    if (info.side === 'start') {
      const proposedStart = newValue;
      const proposedEnd = localTask.end;
      if (proposedEnd - proposedStart < 10) return;
      const isOverlapping = allTasksInRow.some((t) => {
        if (t._id === localTask._id) return false;
        return !(proposedEnd + 2 <= t.start || proposedStart >= t.end + 2);
      });
      if (isOverlapping) return;
      setLocalTask((prev) => {
        const updated = { ...prev, start: proposedStart };
        localTaskRef.current = updated;
        return updated;
      });
    }
    if (info.side === 'end') {
      const proposedStart = localTask.start;
      const proposedEnd = newValue;
      if (proposedEnd - proposedStart < 10) return;
      const isOverlapping = allTasksInRow.some((t) => {
        if (t._id === localTask._id) return false;
        return !(proposedEnd + 2 <= t.start || proposedStart >= t.end + 2);
      });
      if (isOverlapping) return;
      setLocalTask((prev) => {
        const updated = { ...prev, end: proposedEnd };
        localTaskRef.current = updated;
        return updated;
      });
    }
  };

  const onResizeEnd = async () => {
    if (resizingRef.current) resizingRef.current.isResizing = false;
    document.removeEventListener('mousemove', onResizeMove);
    document.removeEventListener('mouseup', onResizeEnd);
    dispatch(
      updateRoadmapTaskInCategory({
        categoryId,
        rowId,
        taskId: localTask._id,
        updates: {
          start: localTaskRef.current.start,
          end: localTaskRef.current.end,
        },
      }),
    );
    await roadmapAPI.updateTask({
      roadmapId,
      categoryId,
      rowId,
      taskId: localTask._id,
      start: localTaskRef.current.start,
      end: localTaskRef.current.end,
    });
  };

  const onProgressResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    progressResizingRef.current = {
      initialX: e.clientX,
      initialProgress: localTask.progress,
      isResizing: true,
    };

    document.addEventListener('mousemove', onProgressResizeMove);
    document.addEventListener('mouseup', onProgressResizeEnd);
  };

  const onProgressResizeMove = (e: MouseEvent) => {
    const info = progressResizingRef.current;
    if (!info || !info.isResizing) return;

    const deltaPx = e.clientX - info.initialX;
    const taskWidthPx =
      ((localTask.end - localTask.start) / (totalQuarters * 100)) *
      roadmapContentWidth;

    const deltaProgress = (deltaPx / taskWidthPx) * 100;
    let newProgress = Math.round(info.initialProgress + deltaProgress);
    newProgress = Math.min(100, Math.max(0, newProgress));

    setLocalTask((prev) => {
      const updated = { ...prev, progress: newProgress };
      localTaskRef.current = updated;
      return updated;
    });
  };

  const onProgressResizeEnd = async () => {
    if (progressResizingRef.current) {
      progressResizingRef.current.isResizing = false;
    }

    document.removeEventListener('mousemove', onProgressResizeMove);
    document.removeEventListener('mouseup', onProgressResizeEnd);

    dispatch(
      updateRoadmapTaskInCategory({
        categoryId,
        rowId,
        taskId: localTask._id,
        updates: {
          progress: localTaskRef.current.progress,
        },
      }),
    );

    await roadmapAPI.updateTask({
      roadmapId,
      categoryId,
      rowId,
      taskId: localTask._id,
      progress: localTaskRef.current.progress,
    });
  };

  const handleOpenEditTaskModal = (task: Task) => {
    dispatch(setRoadmapCurrentTask(task));
    dispatch(setRoadmapIsEditingTaskOpened(true));
    dispatch(setRoadmapCurrentCategory(category));
    dispatch(setRoadmapCurrentRow(row));
  };

  const handleOpenDeleteTaskModal = (task: Task) => {
    dispatch(setRoadmapCurrentTask(task));
    dispatch(setRoadmapIsDeletingTaskOpened(true));
    dispatch(setRoadmapCurrentCategory(category));
    dispatch(setRoadmapCurrentRow(row));
  };

  useEffect(() => {
    setLocalTask(task);
  }, [task]);

  return (
    <div
      className={styles.task}
      draggable
      style={{
        backgroundColor: categoryColor,
        left: `${localTask.start / totalQuarters}%`,
        right: `${(totalQuarters * 100 - localTask.end) / totalQuarters}%`,
      }}
      onDragStart={(e) => {
        const dragData = JSON.stringify({
          taskId: localTask._id,
          categoryId,
          rowId,
          roadmapId: roadmapId,
          start: localTask.start,
          end: localTask.end,
          progress: localTask.progress,
          offsetX: e.clientX,
          title: localTask.title,
        });

        console.log('dragData', dragData);
        e.dataTransfer.setData('application/json', dragData);
      }}
    >
      <div
        className={styles.resizeLeft}
        onMouseDown={(e) => onResizeStart(e, 'start')}
      />
      <div className={styles.taskTitle}>{localTask.title}</div>
      <div
        className={styles.resizeRight}
        onMouseDown={(e) => onResizeStart(e, 'end')}
      />
      <div
        className={styles.taskProgress}
        style={{ width: `${localTask.progress}%` }}
      >
        <div
          className={styles.progressHandle}
          onMouseDown={onProgressResizeStart}
        />
      </div>

      <div className={styles.icons}>
        <FontAwesomeIcon
          className={`${styles.icon} ${styles.pencil}`}
          onClick={(e) => {
            handleOpenEditTaskModal(task);
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
            handleOpenDeleteTaskModal(task);
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};

export default TaskComponent;
