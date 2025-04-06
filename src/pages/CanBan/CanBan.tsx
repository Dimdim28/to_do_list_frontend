import { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import {
  faFolderPlus,
  faGear,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import canbanAPI from '../../api/canbanApi';
import { Modal } from '../../components/common/Modal/Modal';
import Preloader from '../../components/Preloader/Preloader';
import withLoginRedirect from '../../hoc/withLoginRedirect';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectProfile } from '../../redux/slices/auth/selectors';
import {
  moveTask,
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

  const onDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    dispatch(
      moveTask({
        sourceIndex: source.index,
        destinationIndex: destination.index,
        sourceColId: source.droppableId,
        destColId: destination.droppableId,
      }),
    );

    if (!boardId) return;

    if (source.droppableId === destination.droppableId) {
      if (source.index !== destination.index) {
        await canbanAPI.updateTask({
          taskId: draggableId,
          boardId,
          columnId: source.droppableId,
          order: destination.index,
        });
      }
    } else {
      await canbanAPI.moveTaskToAnotherColumn({
        taskId: draggableId,
        boardId,
        columnId: source.droppableId,
        targetColumnId: destination.droppableId,
        order: destination.index,
      });
    }
  };

  const handleOpenAddColumnModal = () => {
    dispatch(setProcessingColumnData(null));
    dispatch(setChangeColumnNameModalOpen(true));
  };

  const handleEditProjectSettingsModal = () => {
    dispatch(setEditProjectModalOpened(true));
  };

  const handleAddUserToProjectModal = () => {
    dispatch(setIsAddUserToProjectModalOpened(true));
  };

  const handleAddTagToProjectModal = () => {
    dispatch(setSelectedTag(null));
    dispatch(setIsAddTagToProjectModalOpened(true));
  };

  useEffect(() => {
    if (boardId) {
      dispatch(fetchCanBanBoardById(boardId));
    }
  }, [dispatch, boardId]);

  if (canBanStatus === Status.LOADING) {
    return <Preloader />;
  }

  const isCreator = currentUserProfile?._id === creatorId;

  return (
    <div className={styles.wrapper}>
      {isCreator ? (
        <div className={styles.line}>
          <button
            className={styles.addColumnButton}
            onClick={handleOpenAddColumnModal}
          >
            {t('addColumn')}
          </button>
          <div className={styles.options}>
            <FontAwesomeIcon
              className={styles.gear}
              onClick={handleEditProjectSettingsModal}
              fontSize="20px"
              icon={faGear}
            />
            <FontAwesomeIcon
              className={styles.user}
              onClick={handleAddUserToProjectModal}
              fontSize="20px"
              icon={faUser}
            />
            <FontAwesomeIcon
              className={styles.tag}
              onClick={handleAddTagToProjectModal}
              fontSize="20px"
              icon={faFolderPlus}
            />
          </div>
        </div>
      ) : null}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.columns}>
          {columns.map((column, index) => (
            <Column
              index={index}
              isCreator={isCreator}
              key={column._id}
              boardId={boardId}
              column={column}
              columns={columns}
            />
          ))}
        </div>
        {columns.length === 0 ? (
          <div className={styles.noColumns}>{t('noColumns')}</div>
        ) : null}
      </DragDropContext>
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
