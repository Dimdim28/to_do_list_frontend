import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';
import {
  faArrowLeft,
  faFolderPlus,
  faGear,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from '../../components/common/Modal/Modal';
import Preloader from '../../components/Preloader/Preloader';
import { useDrag } from '../../helpers/DragContext';
import withLoginRedirect from '../../hoc/withLoginRedirect';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectProfile } from '../../redux/slices/auth/selectors';
import {
  setChangeColumnNameModalOpen,
  setDeleteColumnModalOpen,
  setDeleteTaskModalOpen,
  setEditProjectModalOpened,
  setIsAddTagToProjectModalOpened,
  setIsAddUserToProjectModalOpened,
  setIsTaskInfoModalOpened,
  setProcessingColumnData,
  setSelectedTag,
  setSelectedTask,
} from '../../redux/slices/canban/canban';
import {
  isChangeColumnNameModalOpen,
  isDeleteColumnModalOpen,
  isDeleteTaskModalOpen,
  selectCanBanCreatorId,
  selectColumns,
  selectErrorMessage,
  selectIsAddTagProjectModalOpened,
  selectIsAddUserProjectModalOpened,
  selectIsProjectSettingsOpened,
  selectStatus,
} from '../../redux/slices/canban/selectors';
import { fetchCanBanBoardById } from '../../redux/slices/canban/thunk';
import ROUTES from '../../routes';
import { Status } from '../../types/shared';

import AddTagToProgectModal from './components/AddTagToProjectModal/AddTagToProjectModal';
import AddUserToProjectModal from './components/AddUserToProjectModal/AddUserToProjectModal';
import ChangeColumnName from './components/ChangeColumnName/ChangeColumnName';
import Column from './components/Column';
import DeleteColumn from './components/DeleteColumModal/DeleteColumn';
import DeleteTask from './components/DeleteTaskModal/DeleteTask';
import EditProjectInfo from './components/EditProjectInfo/EditProjectInfo';
import TaskInfoSideBar from './components/TaskInfoSideBar/TaskInfoSideBar';

import styles from './CanBan.module.scss';

const SCROLL_THRESHOLD = 50;
const SCROLL_SPEED = 10;

const CanBan = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const errorMessage = useAppSelector(selectErrorMessage);
  const canBanStatus = useAppSelector(selectStatus);
  const columns = useAppSelector(selectColumns);
  const isEditColumnNameModalOpen = useAppSelector(isChangeColumnNameModalOpen);
  const isDeleteModalOpened = useAppSelector(isDeleteColumnModalOpen);
  const isDeleteTaskModalOpened = useAppSelector(isDeleteTaskModalOpen);
  const isProjectSettingsOpened = useAppSelector(selectIsProjectSettingsOpened);
  const isAddUserToProjectModalOpened = useAppSelector(
    selectIsAddUserProjectModalOpened,
  );
  const isAddTagToProjectModalOpened = useAppSelector(
    selectIsAddTagProjectModalOpened,
  );

  const currentUserProfile = useAppSelector(selectProfile);
  const creatorId = useAppSelector(selectCanBanCreatorId);

  const { id: boardId } = useParams();
  const boardRef = useRef<HTMLDivElement>(null);

  const { setIsDragging, setDraggingTaskId } = useDrag();

  useEffect(() => {
    if (boardId) {
      dispatch(fetchCanBanBoardById(boardId));
    }
  }, [dispatch, boardId]);

  if (canBanStatus === Status.LOADING) {
    return <Preloader />;
  }

  const isCreator = currentUserProfile?._id === creatorId;

  // Горизонтальный автоскролл для контейнера колонок
  const handleBoardDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!boardRef.current) return;
    const board = boardRef.current;
    const { left, right } = board.getBoundingClientRect();
    const mouseX = e.clientX;

    if (mouseX - left < SCROLL_THRESHOLD) {
      board.scrollLeft -= SCROLL_SPEED;
    } else if (right - mouseX < SCROLL_THRESHOLD) {
      board.scrollLeft += SCROLL_SPEED;
    }
  };

  const handleBoardDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setDraggingTaskId(null);
  };

  return (
    <div className={styles.wrapper}>
      {isCreator ? (
        <div className={styles.line}>
          <div className={styles.options}>
            <NavLink to={ROUTES.CanBan} className={styles.backToAllBoards}>
              <FontAwesomeIcon icon={faArrowLeft} /> {t('backToAllBoards')}
            </NavLink>
            <button
              className={styles.addColumnButton}
              onClick={() => {
                dispatch(setProcessingColumnData(null));
                dispatch(setChangeColumnNameModalOpen(true));
              }}
            >
              {t('addColumn')}
            </button>
          </div>

          <div className={styles.options}>
            <FontAwesomeIcon
              className={styles.gear}
              onClick={() => dispatch(setEditProjectModalOpened(true))}
              fontSize="20px"
              icon={faGear}
            />
            <FontAwesomeIcon
              className={styles.user}
              onClick={() => dispatch(setIsAddUserToProjectModalOpened(true))}
              fontSize="20px"
              icon={faUser}
            />
            <FontAwesomeIcon
              className={styles.tag}
              onClick={() => {
                dispatch(setSelectedTag(null));
                dispatch(setIsAddTagToProjectModalOpened(true));
              }}
              fontSize="20px"
              icon={faFolderPlus}
            />
          </div>
        </div>
      ) : (
        <NavLink to={ROUTES.CanBan} className={styles.backToAllBoards}>
          <FontAwesomeIcon icon={faArrowLeft} /> {t('backToAllBoards')}
        </NavLink>
      )}

      <div
        className={styles.columns}
        ref={boardRef}
        onDragOver={handleBoardDragOver}
        onDrop={handleBoardDrop}
      >
        {columns.map((column, index) => (
          <Column
            key={column._id}
            boardId={boardId}
            column={column}
            columns={columns}
            isCreator={isCreator}
            index={index}
          />
        ))}
        {columns.length === 0 && (
          <div className={styles.noColumns}>{t('noColumns')}</div>
        )}
      </div>

      <Modal
        active={isEditColumnNameModalOpen}
        setActive={() => {
          dispatch(setChangeColumnNameModalOpen(false));
        }}
        ChildComponent={ChangeColumnName}
        childProps={{}}
      />
      <Modal
        active={isDeleteModalOpened}
        setActive={() => {
          dispatch(setDeleteColumnModalOpen(false));
        }}
        ChildComponent={DeleteColumn}
        childProps={{}}
      />
      <Modal
        active={isProjectSettingsOpened}
        setActive={() => {
          dispatch(setEditProjectModalOpened(false));
        }}
        ChildComponent={EditProjectInfo}
        childProps={{}}
      />
      <Modal
        active={isAddUserToProjectModalOpened}
        setActive={() => {
          dispatch(setIsAddUserToProjectModalOpened(false));
        }}
        ChildComponent={AddUserToProjectModal}
        childProps={{}}
      />
      <Modal
        active={isAddTagToProjectModalOpened}
        setActive={() => {
          dispatch(setIsAddTagToProjectModalOpened(false));
        }}
        ChildComponent={AddTagToProgectModal}
        childProps={{}}
      />

      <TaskInfoSideBar />

      <Modal
        active={isDeleteTaskModalOpened}
        setActive={() => {
          dispatch(setDeleteTaskModalOpen(false));
          dispatch(setProcessingColumnData(null));
          dispatch(setSelectedTask({ task: null }));
          dispatch(setIsTaskInfoModalOpened(false));
        }}
        ChildComponent={DeleteTask}
        childProps={{}}
      />

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default withLoginRedirect(CanBan);
