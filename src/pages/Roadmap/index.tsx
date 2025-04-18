import { DragEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import roadmapAPI from '../../api/roadmapApi';
import { Modal } from '../../components/common/Modal/Modal';
import Preloader from '../../components/Preloader/Preloader';
import withLoginRedirect from '../../hoc/withLoginRedirect';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addRoadmapNewLineToCategory,
  addRoadmapNewQuarter,
  moveRoadmapTask,
  setRoadmapClickPosition,
  setRoadmapCurrentCategory,
  setRoadmapCurrentMilestone,
  setRoadmapCurrentQuarter,
  setRoadmapCurrentRow,
  setRoadmapCurrentTask,
  setRoadmapIsDeletingCategoryOpened,
  setRoadmapIsDeletingMilestoneOpened,
  setRoadmapIsDeletingQuarterOpened,
  setRoadmapIsDeletingRowOpened,
  setRoadmapIsDeletingTaskOpened,
  setRoadmapIsEditingCategoryOpened,
  setRoadmapIsEditingMilestoneOpened,
  setRoadmapIsEditingTaskOpened,
  updateRoadmapData,
  updateRoadmapTaskInCategory,
} from '../../redux/slices/roadmap/roadmap';
import {
  selectRoadmapData,
  selectRoadmapIsDeletingCategoryOpened,
  selectRoadmapIsDeletingMilestoneModalOpened,
  selectRoadmapIsDeletingQuarterOpened,
  selectRoadmapIsDeletingRowOpened,
  selectRoadmapIsDeletingTaskModalOpened,
  selectRoadmapIsEditingCategoryOpened,
  selectRoadmapIsEditingMilestoneModalOpened,
  selectRoadmapIsEditingTaskModalOpened,
} from '../../redux/slices/roadmap/selectors';
import {
  Category,
  Quarter,
  RoadmapData,
  Row,
} from '../../redux/slices/roadmap/type';
import { Status } from '../../types/shared';

import { CategoryDeleting } from './components/CategoryDeleting/CategoryDeleting';
import CategoryForm from './components/CategoryForm/CategoryForm';
import MilestoneComponent from './components/Milestone';
import { MilestoneDeleting } from './components/MilestoneDeleting/MilestoneDeleting';
import MilestoneForm from './components/MilestoneForm/MilestoneForm';
import { QuarterDeleting } from './components/QuarterDeleting/QuarterDeleting';
import { RowDeleting } from './components/RowDeleting/RowDeleting';
import TaskComponent from './components/Task';
import { TaskDeleting } from './components/TaskDeleting/TaskDeleting';
import TaskForm from './components/TaskForm/TaskForm';

import styles from './styles.module.scss';

const RoadMap = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { id: boardId } = useParams();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const SCROLL_THRESHOLD = 50;
  const SCROLL_SPEED = 10;

  const data = useAppSelector(selectRoadmapData);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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

  const taskEditing = useAppSelector(selectRoadmapIsEditingTaskModalOpened);
  const taskDeleting = useAppSelector(selectRoadmapIsDeletingTaskModalOpened);

  useEffect(() => {
    const fetchBoardData = async (boardId: string) => {
      setIsLoading(true);
      const res = await roadmapAPI.getBoard(boardId);

      if (res.status === Status.SUCCESS) {
        dispatch(updateRoadmapData(res.data));
        setErrorMessage('');
        setIsLoading(false);
      } else {
        setErrorMessage(res.message);
        setIsLoading(false);
      }
    };

    if (boardId) {
      fetchBoardData(boardId);
    }
  }, [boardId, dispatch]);

  if (errorMessage)
    return (
      <div className={styles.wrapper}>
        <div className={styles.error}>{errorMessage}</div>
      </div>
    );

  if (isLoading || !data)
    return (
      <div className={styles.wrapper}>
        <Preloader />
      </div>
    );

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

  const handleCreateRow = async (category: Category, data: RoadmapData) => {
    const result = await roadmapAPI.createRow({
      categoryId: category._id,
      roadmapId: data._id,
    });

    if (result.status === Status.SUCCESS) {
      const newRow = result.data;
      dispatch(
        addRoadmapNewLineToCategory({
          rowId: newRow._id,
          categoryId: category._id,
        }),
      );
    }
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

  const handleRowDoubleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    row: Row,
    category: Category,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const rowWidth = rect.width;

    const timelineWidth = totalQuarters * 100;
    const timelineValue = Math.round((clickX / rowWidth) * timelineWidth);

    const taskLength = 12;
    const buffer = 2;

    const newStart = timelineValue;
    const newEnd = newStart + taskLength;

    const hasOverlap = row.tasks.some(
      (task) =>
        !(task.end + buffer <= newStart || task.start >= newEnd + buffer),
    );

    const outOfBounds = newEnd > timelineWidth || newStart < 0;

    if (hasOverlap || outOfBounds) {
      return;
    }

    dispatch(setRoadmapClickPosition(newStart));
    dispatch(setRoadmapCurrentCategory(category));
    dispatch(setRoadmapCurrentRow(row));
    dispatch(setRoadmapCurrentTask(null));
    dispatch(setRoadmapIsEditingTaskOpened(true));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    e.preventDefault();

    const wrapper = wrapperRef.current;
    const { top, bottom } = wrapper.getBoundingClientRect();
    const mouseY = e.clientY;

    if (mouseY - top < SCROLL_THRESHOLD) {
      wrapper.scrollTop -= SCROLL_SPEED;
    } else if (bottom - mouseY < SCROLL_THRESHOLD) {
      wrapper.scrollTop += SCROLL_SPEED;
    }
  };

  const handleMilestoneDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;

    const timelineValue = Math.round(percent * totalQuarters * 100);
    const maxPosition = totalQuarters * 100;

    const minDistance = 10;

    const isTooClose = milestones.some(
      (m) => Math.abs(m.position - timelineValue) < minDistance,
    );

    const outOfBounds = timelineValue < 5 || timelineValue > maxPosition - 10;

    if (isTooClose || outOfBounds) {
      return;
    }

    dispatch(setRoadmapClickPosition(timelineValue));
    dispatch(setRoadmapCurrentMilestone(null));
    dispatch(setRoadmapIsEditingMilestoneOpened(true));
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

    const isSameRow =
      data.rowId === row._id && data.categoryId === category._id;

    if (newStart < 0 || newEnd > timelineWidth) return;

    const overlap = row.tasks.some(
      (t) =>
        t._id !== data.taskId &&
        !(newEnd + 2 <= t.start || newStart >= t.end + 2),
    );

    if (overlap) return;

    if (isSameRow) {
      dispatch(
        updateRoadmapTaskInCategory({
          categoryId: category._id,
          rowId: row._id,
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
        _id: data.taskId,
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
          toCategoryId: category._id,
          toRowId: row._id,
          task,
        }),
      );

      // TODO: API для перемещения
      // await api.moveTask({ taskId: data.taskId, toRowId: row.id, start: newStart, end: newEnd });
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      onDragOver={handleDragOver}
    >
      <h1 className={styles.projectTitle}>{title}</h1>

      <div
        className={styles.roadmap}
        style={{ minWidth: `${210 + totalQuarters * 300}px` }}
      >
        <div className={styles.quarterLines}>
          {quarters.map((quarter, index) =>
            index > 0 ? (
              <div
                key={quarter._id}
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
                  key={quarteer._id}
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
            <div
              className={styles.milestonesRow}
              onDoubleClick={handleMilestoneDoubleClick}
            >
              {milestones.map((milestone) => (
                <MilestoneComponent
                  totalQuarters={totalQuarters}
                  milestone={milestone}
                  key={milestone._id}
                />
              ))}
            </div>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category._id} className={styles.lineWrapper}>
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
                  onDoubleClick={(e) => handleRowDoubleClick(e, row, category)}
                  key={row._id}
                  className={styles.row}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleTaskDrop(e, row, category)}
                >
                  {row.tasks.map((task) => (
                    <TaskComponent
                      allTasksInRow={row.tasks}
                      task={task}
                      totalQuarters={totalQuarters}
                      key={task._id}
                      category={category}
                      row={row}
                    />
                  ))}

                  <FontAwesomeIcon
                    fontSize="15px"
                    icon={faTrash}
                    className={styles.removeRowIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDeleteRowModal(row, category);
                    }}
                  />
                </div>
              ))}

              <FontAwesomeIcon
                className={styles.addRowIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateRow(category, data);
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
        childProps={{ roadmapId: data._id }}
      />
      <Modal
        active={categoryDeleting}
        setActive={() => {
          dispatch(setRoadmapCurrentCategory(null));
          dispatch(setRoadmapIsDeletingCategoryOpened(false));
        }}
        ChildComponent={CategoryDeleting}
        childProps={{ roadmapId: data._id }}
      />

      <Modal
        active={rowDeleting}
        setActive={() => {
          dispatch(setRoadmapCurrentRow(null));
          dispatch(setRoadmapIsDeletingRowOpened(false));
        }}
        ChildComponent={RowDeleting}
        childProps={{ roadmapId: data._id }}
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
          dispatch(setRoadmapClickPosition(0));
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

      <Modal
        active={taskEditing}
        setActive={() => {
          dispatch(setRoadmapCurrentTask(null));
          dispatch(setRoadmapIsEditingTaskOpened(false));
          dispatch(setRoadmapCurrentCategory(null));
          dispatch(setRoadmapCurrentRow(null));
          dispatch(setRoadmapClickPosition(0));
        }}
        ChildComponent={TaskForm}
        childProps={{}}
      />

      <Modal
        active={taskDeleting}
        setActive={() => {
          dispatch(setRoadmapCurrentTask(null));
          dispatch(setRoadmapIsDeletingTaskOpened(false));
          dispatch(setRoadmapCurrentCategory(null));
          dispatch(setRoadmapCurrentRow(null));
        }}
        ChildComponent={TaskDeleting}
        childProps={{}}
      />
    </div>
  );
};

export default withLoginRedirect(RoadMap);
