import { FC, useRef } from 'react';

import { useAppDispatch } from '../../../../hooks';
import { updateTaskInCategory } from '../../../../redux/slices/roadmap/roadmap';
import { Task } from '../../../../redux/slices/roadmap/type';

import styles from './styles.module.scss';

interface TaskProps {
  totalQuarters: number;
  task: Task;
  categoryId: string;
  rowId: string;
  categoryColor: string;
}
const TaskComponent: FC<TaskProps> = ({
  totalQuarters,
  task,
  categoryId,
  rowId,
  categoryColor,
}) => {
  const dispatch = useAppDispatch();

  const resizingRef = useRef<{
    taskId: string;
    categoryId: string;
    rowId: string;
    side: 'start' | 'end';
    initialX: number;
    initialValue: number;
    isResizing: boolean;
  } | null>(null);

  const progressResizingRef = useRef<{
    taskId: string;
    categoryId: string;
    rowId: string;
    initialX: number;
    initialProgress: number;
    isResizing: boolean;
  } | null>(null);

  const onResizeStart = (
    e: React.MouseEvent,
    task: Task,
    categoryId: string,
    side: 'start' | 'end',
  ) => {
    e.stopPropagation();
    e.preventDefault();

    resizingRef.current = {
      taskId: task.id,
      categoryId,
      rowId: rowId,
      side,
      initialX: e.clientX,
      initialValue: task[side],
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
    const roadmapWidth = 300 * totalQuarters;
    const deltaValue = (deltaPx / roadmapWidth) * (totalQuarters * 100);

    const maxValue = totalQuarters * 100;
    const newValue = Math.round(info.initialValue + deltaValue);

    if (newValue < 0 || newValue > maxValue) return;
    if (info.side === 'start') {
      if (newValue >= task.end || task.end - newValue < 10) return;
    }
    if (info.side === 'end') {
      if (newValue <= task.start || newValue - task.start < 10) return;
    }

    dispatch(
      updateTaskInCategory({
        categoryId: info.categoryId,
        rowId: info.rowId,
        taskId: info.taskId,
        updates: {
          [info.side]: newValue,
        },
      }),
    );
  };

  const onResizeEnd = () => {
    if (resizingRef.current) {
      resizingRef.current.isResizing = false;
    }

    document.removeEventListener('mousemove', onResizeMove);
    document.removeEventListener('mouseup', onResizeEnd);
  };

  const onProgressResizeStart = (
    e: React.MouseEvent,
    task: Task,
    categoryId: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    progressResizingRef.current = {
      taskId: task.id,
      categoryId,
      rowId: rowId,
      initialX: e.clientX,
      initialProgress: task.progress,
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
      ((task.end - task.start) / (totalQuarters * 100)) * (300 * totalQuarters);

    const deltaProgress = (deltaPx / taskWidthPx) * 100;
    let newProgress = Math.round(info.initialProgress + deltaProgress);

    newProgress = Math.min(100, Math.max(0, newProgress)); // [0, 100]

    dispatch(
      updateTaskInCategory({
        categoryId: info.categoryId,
        rowId: info.rowId,
        taskId: info.taskId,
        updates: { progress: newProgress },
      }),
    );
  };

  const onProgressResizeEnd = () => {
    if (progressResizingRef.current) {
      progressResizingRef.current.isResizing = false;
    }
    document.removeEventListener('mousemove', onProgressResizeMove);
    document.removeEventListener('mouseup', onProgressResizeEnd);
  };

  return (
    <div
      className={styles.task}
      key={task.id}
      style={{
        backgroundColor: categoryColor,
        left: `${task.start / totalQuarters}%`,
        right: `${(totalQuarters * 100 - task.end) / totalQuarters}%`,
      }}
    >
      <div
        className={styles.resizeLeft}
        onMouseDown={(e) => onResizeStart(e, task, categoryId, 'start')}
      ></div>
      <div className={styles.taskTitle}> {task.title}</div>
      <div
        className={styles.resizeRight}
        onMouseDown={(e) => onResizeStart(e, task, categoryId, 'end')}
      ></div>
      <div
        className={styles.taskProgress}
        style={{ width: `${task.progress}%` }}
      >
        <div
          className={styles.progressHandle}
          onMouseDown={(e) => onProgressResizeStart(e, task, categoryId)}
        />
      </div>
    </div>
  );
};

export default TaskComponent;
