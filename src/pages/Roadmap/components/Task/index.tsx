import { FC, useEffect, useRef, useState } from 'react';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
}

const TaskComponent: FC<TaskProps> = ({
  totalQuarters,
  task,
  row,
  category,
  allTasksInRow,
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

  const roadmapWidth = 300 * totalQuarters;
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
    const deltaValue = (deltaPx / roadmapWidth) * (totalQuarters * 100);
    const newValue = Math.round(info.initialValue + deltaValue);

    const maxValue = totalQuarters * 100;

    if (newValue < 0 || newValue > maxValue) return;

    if (info.side === 'start') {
      if (newValue >= localTask.end || localTask.end - newValue < 10) return;
    }
    if (info.side === 'end') {
      if (newValue <= localTask.start || newValue - localTask.start < 10)
        return;
    }

    const overlap = allTasksInRow.some(
      (t) =>
        t._id !== localTask._id &&
        !(newValue <= t.start - 2 || newValue >= t.end + 2),
    );

    if (overlap) return;

    setLocalTask((prev) => {
      const updated = { ...prev, [info.side]: newValue };
      localTaskRef.current = updated;
      return updated;
    });
  };

  const onResizeEnd = () => {
    if (resizingRef.current) {
      resizingRef.current.isResizing = false;
    }

    document.removeEventListener('mousemove', onResizeMove);
    document.removeEventListener('mouseup', onResizeEnd);

    // ✅ Один раз отправляем в Redux и можно сделать API-запрос
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

    // 📡 TODO: Здесь можно отправить PUT/PATCH запрос на сервер
    // await api.updateTask(localTask.id, { start: localTask.start, end: localTask.end });
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
      roadmapWidth;

    const deltaProgress = (deltaPx / taskWidthPx) * 100;
    let newProgress = Math.round(info.initialProgress + deltaProgress);
    newProgress = Math.min(100, Math.max(0, newProgress));

    setLocalTask((prev) => {
      const updated = { ...prev, progress: newProgress };
      localTaskRef.current = updated;
      return updated;
    });
  };

  const onProgressResizeEnd = () => {
    if (progressResizingRef.current) {
      progressResizingRef.current.isResizing = false;
    }

    document.removeEventListener('mousemove', onProgressResizeMove);
    document.removeEventListener('mouseup', onProgressResizeEnd);

    // ✅ Один раз отправляем прогресс в Redux и можно сделать API-запрос
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

    // 📡 TODO: Здесь можно отправить PUT/PATCH запрос на сервер
    // await api.updateTask(localTask.id, { progress: localTask.progress });
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
          start: localTask.start,
          end: localTask.end,
          progress: localTask.progress,
          offsetX: e.clientX,
          title: localTask.title,
        });
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
