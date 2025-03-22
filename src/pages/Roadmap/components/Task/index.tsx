import { FC, useRef, useState } from 'react';

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

  const [localTask, setLocalTask] = useState(task);

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

    setLocalTask((prev) => ({ ...prev, [info.side]: newValue }));
  };

  const onResizeEnd = () => {
    if (resizingRef.current) {
      resizingRef.current.isResizing = false;
    }

    document.removeEventListener('mousemove', onResizeMove);
    document.removeEventListener('mouseup', onResizeEnd);

    // ✅ Один раз отправляем в Redux и можно сделать API-запрос
    dispatch(
      updateTaskInCategory({
        categoryId,
        rowId,
        taskId: localTask.id,
        updates: {
          start: localTask.start,
          end: localTask.end,
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

    setLocalTask((prev) => ({ ...prev, progress: newProgress }));
  };

  const onProgressResizeEnd = () => {
    if (progressResizingRef.current) {
      progressResizingRef.current.isResizing = false;
    }

    document.removeEventListener('mousemove', onProgressResizeMove);
    document.removeEventListener('mouseup', onProgressResizeEnd);

    // ✅ Один раз отправляем прогресс в Redux и можно сделать API-запрос
    dispatch(
      updateTaskInCategory({
        categoryId,
        rowId,
        taskId: localTask.id,
        updates: {
          progress: localTask.progress,
        },
      }),
    );

    // 📡 TODO: Здесь можно отправить PUT/PATCH запрос на сервер
    // await api.updateTask(localTask.id, { progress: localTask.progress });
  };

  return (
    <div
      className={styles.task}
      style={{
        backgroundColor: categoryColor,
        left: `${localTask.start / totalQuarters}%`,
        right: `${(totalQuarters * 100 - localTask.end) / totalQuarters}%`,
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
    </div>
  );
};

export default TaskComponent;
