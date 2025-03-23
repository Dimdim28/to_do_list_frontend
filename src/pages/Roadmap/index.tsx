import { DragEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from '../../components/common/Modal/Modal';
import Preloader from '../../components/Preloader/Preloader';
import withLoginRedirect from '../../hoc/withLoginRedirect';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addRoadmapNewLineToCategory,
  addRoadmapNewQuarter,
  moveRoadmapTask,
  setRoadmapCurrentCategory,
  setRoadmapCurrentMilestone,
  setRoadmapCurrentQuarter,
  setRoadmapCurrentRow,
  setRoadmapIsDeletingCategoryOpened,
  setRoadmapIsDeletingMilestoneOpened,
  setRoadmapIsDeletingQuarterOpened,
  setRoadmapIsDeletingRowOpened,
  setRoadmapIsEditingCategoryOpened,
  setRoadmapIsEditingMilestoneOpened,
  updateRoadmapTaskInCategory,
} from '../../redux/slices/roadmap/roadmap';
import {
  selectRoadmapData,
  selectRoadmapIsDeletingCategoryOpened,
  selectRoadmapIsDeletingMilestoneModalOpened,
  selectRoadmapIsDeletingQuarterOpened,
  selectRoadmapIsDeletingRowOpened,
  selectRoadmapIsEditingCategoryOpened,
  selectRoadmapIsEditingMilestoneModalOpened,
  selectRoadmapMessage,
  selectRoadmapStatus,
} from '../../redux/slices/roadmap/selectors';
import { Category, Quarter, Row } from '../../redux/slices/roadmap/type';
import { Status } from '../../types/shared';

import { CategoryDeleting } from './components/CategoryDeleting/CategoryDeleting';
import CategoryForm from './components/CategoryForm/CategoryForm';
import MilestoneComponent from './components/Milestone';
import { MilestoneDeleting } from './components/MilestoneDeleting/MilestoneDeleting';
import MilestoneForm from './components/MilestoneForm/MilestoneForm';
import { QuarterDeleting } from './components/QuarterDeleting/QuarterDeleting';
import { RowDeleting } from './components/RowDeleting/RowDeleting';
import TaskComponent from './components/Task';

import styles from './styles.module.scss';

const RoadMap = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const data = useAppSelector(selectRoadmapData);
  const status = useAppSelector(selectRoadmapStatus);
  const message = useAppSelector(selectRoadmapMessage);

  const categoryEditing = useAppSelector(selectRoadmapIsEditingCategoryOpened);
  const categoryDeleting = useAppSelector(
    selectRoadmapIsDeletingCategoryOpened,
  );
  const rowDeleting = useAppSelector(selectRoadmapIsDeletingRowOpened);
  const quarterDeleting = useAppSelector(selectRoadmapIsDeletingQuarterOpened);

  const milestoneEditing = useAppSelector(
    selectRoadmapIsEditingMilestoneModalOpened,
  );
  const milestoneDeleting = useAppSelector(
    selectRoadmapIsDeletingMilestoneModalOpened,
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

  const handleOpenDeleteRowModal = (row: Row, category: Category) => {
    dispatch(setRoadmapCurrentRow(row));
    dispatch(setRoadmapCurrentCategory(category));
    dispatch(setRoadmapIsDeletingRowOpened(true));
  };

  const handleOpenDeleteQuarteerModal = (quarter: Quarter) => {
    dispatch(setRoadmapCurrentQuarter(quarter));
    dispatch(setRoadmapIsDeletingQuarterOpened(true));
  };

  const handleTaskDrop = (
    e: DragEvent<HTMLDivElement>,
    row: Row,
    category: Category,
  ) => {
    if (!e.dataTransfer) return;
    const raw = e.dataTransfer.getData('application/json');

    if (!raw) return;
    const data = JSON.parse(raw);

    const dropX = e.clientX;
    const roadmapWidth = 300 * totalQuarters;
    const timelineWidth = totalQuarters * 100;

    const deltaPx = dropX - data.offsetX;
    const deltaValue = (deltaPx / roadmapWidth) * timelineWidth;

    const newStart = Math.round(data.start + deltaValue);
    const newEnd = Math.round(data.end + deltaValue);

    const isSameRow = data.rowId === row.id && data.categoryId === category.id;

    if (newStart < 0 || newEnd > timelineWidth) return;

    const overlap = row.tasks.some(
      (t) =>
        t.id !== data.taskId &&
        !(newEnd + 2 <= t.start || newStart >= t.end + 2),
    );

    if (overlap) return;

    if (isSameRow) {
      // Просто двигаем таску по оси X
      dispatch(
        updateRoadmapTaskInCategory({
          categoryId: category.id,
          rowId: row.id,
          taskId: data.taskId,
          updates: {
            start: newStart,
            end: newEnd,
          },
        }),
      );

      // TODO: API для позиции
      // await api.updateTask(data.taskId, { start: newStart, end: newEnd });
    } else {
      const task = {
        id: data.taskId,
        title: data.title,
        start: newStart,
        end: newEnd,
        progress: data.progress,
        status: data.status,
      };

      dispatch(
        moveRoadmapTask({
          fromCategoryId: data.categoryId,
          fromRowId: data.rowId,
          toCategoryId: category.id,
          toRowId: row.id,
          task,
        }),
      );

      // TODO: API для перемещения
      // await api.moveTask({ taskId: data.taskId, toRowId: row.id, start: newStart, end: newEnd });
    }
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
              {quarters.map((quarteer, id) => (
                <div
                  key={quarteer.id}
                  className={styles.quarteer}
                  style={{ width: `${100 / totalQuarters}%` }}
                >
                  {quarteer.title}

                  {id === quarters.length - 1 ? (
                    <FontAwesomeIcon
                      fontSize="15px"
                      icon={faTrash}
                      className={styles.removeQuarterIcon}
                      onClick={(e) => {
                        handleOpenDeleteQuarteerModal(quarteer);
                        e.stopPropagation();
                      }}
                    />
                  ) : null}
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
            {t('milestones')}
          </div>
          <div className={styles.blocks}>
            <div className={styles.milestonesRow}>
              {milestones.map((milestone) => (
                <MilestoneComponent
                  totalQuarters={totalQuarters}
                  milestone={milestone}
                  key={milestone.id}
                />
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
                <div
                  key={row.id}
                  className={styles.row}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleTaskDrop(e, row, category)}
                >
                  {row.tasks.map((task) => (
                    <TaskComponent
                      allTasksInRow={row.tasks}
                      task={task}
                      totalQuarters={totalQuarters}
                      key={task.id}
                      categoryId={category.id}
                      rowId={row.id}
                      categoryColor={category.color}
                    />
                  ))}

                  <FontAwesomeIcon
                    fontSize="15px"
                    icon={faTrash}
                    className={styles.removeRowIcon}
                    onClick={(e) => {
                      handleOpenDeleteRowModal(row, category);
                      e.stopPropagation();
                    }}
                  />
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
          dispatch(setRoadmapCurrentCategory(null));
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

      <Modal
        active={rowDeleting}
        setActive={() => {
          dispatch(setRoadmapCurrentRow(null));
          dispatch(setRoadmapIsDeletingRowOpened(false));
        }}
        ChildComponent={RowDeleting}
        childProps={{}}
      />

      <Modal
        active={quarterDeleting}
        setActive={() => {
          dispatch(setRoadmapCurrentQuarter(null));
          dispatch(setRoadmapIsDeletingQuarterOpened(false));
        }}
        ChildComponent={QuarterDeleting}
        childProps={{}}
      />

      <Modal
        active={milestoneEditing}
        setActive={() => {
          dispatch(setRoadmapCurrentMilestone(null));
          dispatch(setRoadmapIsEditingMilestoneOpened(false));
        }}
        ChildComponent={MilestoneForm}
        childProps={{}}
      />

      <Modal
        active={milestoneDeleting}
        setActive={() => {
          dispatch(setRoadmapCurrentMilestone(null));
          dispatch(setRoadmapIsDeletingMilestoneOpened(false));
        }}
        ChildComponent={MilestoneDeleting}
        childProps={{}}
      />
    </div>
  );
};

export default withLoginRedirect(RoadMap);
