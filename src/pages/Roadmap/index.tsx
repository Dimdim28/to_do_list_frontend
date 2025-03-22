import { useRef } from 'react';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from '../../components/common/Modal/Modal';
import Preloader from '../../components/Preloader/Preloader';
import withLoginRedirect from '../../hoc/withLoginRedirect';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addRoadmapNewLineToCategory,
  addRoadmapNewQuarter,
  setRoadmapCurrentCategory,
  setRoadmapIsDeletingCategoryOpened,
  setRoadmapIsEditingCategoryOpened,
  updateTaskInCategory,
} from '../../redux/slices/roadmap/roadmap';
import {
  selectRoadmapData,
  selectRoadmapIsDeletingCategoryOpened,
  selectRoadmapIsEditingCategoryOpened,
  selectRoadmapMessage,
  selectRoadmapStatus,
} from '../../redux/slices/roadmap/selectors';
import { Category, Task } from '../../redux/slices/roadmap/type';
import { Status } from '../../types/shared';

import { CategoryDeleting } from './components/CategoryDeleting/CategoryDeleting';
import CategoryForm from './components/CategoryForm/CategoryForm';

import styles from './styles.module.scss';

const RoadMap = () => {
  const dispatch = useAppDispatch();

  const resizingRef = useRef<{
    taskId: string;
    categoryId: string;
    rowId: string;
    side: 'start' | 'end';
    initialX: number;
    initialValue: number;
  } | null>(null);

  const data = useAppSelector(selectRoadmapData);
  const status = useAppSelector(selectRoadmapStatus);
  const message = useAppSelector(selectRoadmapMessage);

  const categoryEditing = useAppSelector(selectRoadmapIsEditingCategoryOpened);
  const categoryDeleting = useAppSelector(
    selectRoadmapIsDeletingCategoryOpened,
  );

  if (status === Status.LOADING) return <Preloader />;
  if (!data) return <div className={styles.error}>{message}</div>;

  const { title, categories, milestones, quarters } = data;

  const totalQuarters = quarters.length;

  const handleOpenEditColumnModal = (category: Category) => {
    dispatch(setRoadmapCurrentCategory(category));
    dispatch(setRoadmapIsEditingCategoryOpened(true));
  };

  const handleOpenDeleteColumnModal = (category: Category) => {
    dispatch(setRoadmapCurrentCategory(category));
    dispatch(setRoadmapIsDeletingCategoryOpened(true));
  };

  const handleEditProjectSettingsModal = () => {
    dispatch(setRoadmapCurrentCategory(null));
    dispatch(setRoadmapIsEditingCategoryOpened(true));
  };

  const onResizeStart = (
    e: React.MouseEvent,
    task: Task,
    categoryId: string,
    side: 'start' | 'end',
  ) => {
    e.stopPropagation();

    const row = categories
      .find((c) => c.id === categoryId)
      ?.rows.find((r) => r.tasks.some((t) => t.id === task.id));

    if (!row) return;

    resizingRef.current = {
      taskId: task.id,
      categoryId,
      rowId: row.id,
      side,
      initialX: e.clientX,
      initialValue: task[side],
    };

    document.addEventListener('mousemove', onResizeMove);
    document.addEventListener('mouseup', onResizeEnd);
  };

  const onResizeMove = (e: MouseEvent) => {
    const info = resizingRef.current;
    if (!info) return;

    const deltaPx = e.clientX - info.initialX;
    const roadmapWidth = 300 * totalQuarters;
    const deltaValue = (deltaPx / roadmapWidth) * (totalQuarters * 100);

    const category = categories.find((c) => c.id === info.categoryId);
    const row = category?.rows.find((r) => r.id === info.rowId);
    const task = row?.tasks.find((t) => t.id === info.taskId);

    if (!task) return;

    const newValue = Math.round(info.initialValue + deltaValue);
    const maxValue = totalQuarters * 100;

    if (newValue < 0 || newValue > maxValue) return;

    if (info.side === 'start') {
      if (newValue >= task.end) return;
      if (task.end - newValue < 10) return;
    }
    if (info.side === 'end') {
      if (newValue <= task.start) return;
      if (newValue - task.start < 10) return;
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
    resizingRef.current = null;
    document.removeEventListener('mousemove', onResizeMove);
    document.removeEventListener('mouseup', onResizeEnd);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.projectTitle}>{title}</h1>

      <div
        className={styles.roadmap}
        style={{ minWidth: `${210 + totalQuarters * 300}px` }}
      >
        <div className={styles.quarterLines}>
          {quarters.map((quarter, index) =>
            index > 0 ? (
              <div
                key={quarter.id}
                className={styles.quarterLine}
                style={{
                  left: `${(index / totalQuarters) * 100}%`,
                }}
              />
            ) : null,
          )}
        </div>
        <div className={styles.lineWrapper}>
          <div className={styles.category}></div>
          <div className={styles.blocks}>
            <div className={styles.quarteers}>
              {quarters.map((quarteer) => (
                <div
                  key={quarteer.id}
                  className={styles.quarteer}
                  style={{ width: `${100 / totalQuarters}%` }}
                >
                  {quarteer.title}
                </div>
              ))}

              <FontAwesomeIcon
                className={styles.addQuarterIcon}
                onClick={() => dispatch(addRoadmapNewQuarter())}
                fontSize="20px"
                icon={faPlus}
              />
            </div>
          </div>
        </div>

        <div className={styles.lineWrapper}>
          <div
            className={styles.category}
            style={{
              backgroundColor: '#4066FE',
            }}
          >
            Milestones
          </div>
          <div className={styles.blocks}>
            <div className={styles.milestonesRow}>
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className={styles.milestone}
                  style={{ left: `${milestone.position / totalQuarters}%` }}
                >
                  {milestone.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category.id} className={styles.lineWrapper}>
            <div
              className={styles.category}
              style={{
                backgroundColor: category.color,
              }}
            >
              {category.title}

              <div className={styles.icons}>
                <FontAwesomeIcon
                  className={`${styles.icon} ${styles.pencil}`}
                  onClick={(e) => {
                    handleOpenEditColumnModal(category);

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
                    handleOpenDeleteColumnModal(category);
                    e.stopPropagation();
                  }}
                />
              </div>
            </div>

            <div className={`${styles.blocks} ${styles.rows}`}>
              {category.rows.map((row) => (
                <div key={row.id} className={styles.row}>
                  {row.tasks.map((task) => (
                    <div
                      className={styles.task}
                      key={task.id}
                      style={{
                        backgroundColor: category.color,
                        left: `${task.start / totalQuarters}%`,
                        right: `${
                          (totalQuarters * 100 - task.end) / totalQuarters
                        }%`,
                      }}
                    >
                      <div
                        className={styles.resizeLeft}
                        onMouseDown={(e) =>
                          onResizeStart(e, task, category.id, 'start')
                        }
                      ></div>
                      <div className={styles.taskTitle}> {task.title}</div>
                      <div
                        className={styles.resizeRight}
                        onMouseDown={(e) =>
                          onResizeStart(e, task, category.id, 'end')
                        }
                      ></div>
                      <div
                        className={styles.taskProgress}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              ))}

              <FontAwesomeIcon
                className={styles.addRowIcon}
                onClick={() => {
                  dispatch(
                    addRoadmapNewLineToCategory({
                      rowId: `${
                        Math.random() * 1000 + 'category' + Math.random() * 100
                      }`,
                      categoryId: category.id,
                      title: '',
                    }),
                  );
                }}
                fontSize="20px"
                icon={faPlus}
              />
            </div>
          </div>
        ))}
        <div className={styles.line}>
          <FontAwesomeIcon
            className={styles.addIcon}
            onClick={handleEditProjectSettingsModal}
            fontSize="20px"
            icon={faPlus}
          />
        </div>
      </div>

      <Modal
        active={categoryEditing}
        setActive={() => {
          dispatch(setRoadmapCurrentCategory(null));
          dispatch(setRoadmapIsEditingCategoryOpened(false));
        }}
        ChildComponent={CategoryForm}
        childProps={{}}
      />
      <Modal
        active={categoryDeleting}
        setActive={() => {
          dispatch(setRoadmapCurrentCategory(null));
          dispatch(setRoadmapIsDeletingCategoryOpened(false));
        }}
        ChildComponent={CategoryDeleting}
        childProps={{}}
      />
    </div>
  );
};

export default withLoginRedirect(RoadMap);
