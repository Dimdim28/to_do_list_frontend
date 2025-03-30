import { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import {
  faFolderPlus,
  faGear,
  faPencil,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from '../../components/common/Modal/Modal';
import Preloader from '../../components/Preloader/Preloader';
import UserImage from '../../components/UserImage/UserImage';
import withLoginRedirect from '../../hoc/withLoginRedirect';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectProfile } from '../../redux/slices/auth/selectors';
import {
  moveTask,
  setChangeColumnNameModalOpen,
  setDeleteColumnModalOpen,
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
  selectCanBanCreatorId,
  selectColumns,
  selectErrorMessage,
  selectIsAddTagProjectModalOpened,
  selectIsAddUserProjectModalOpened,
  selectIsProjectSettingsOpened,
  selectStatus,
} from '../../redux/slices/canban/selectors';
import { fetchCanBanBoardById } from '../../redux/slices/canban/thunk';
import { Column, SelectedTaskInfo } from '../../redux/slices/canban/type';
import { Status } from '../../types/shared';

import AddTagToProgectModal from './components/AddTagToProjectModal/AddTagToProjectModal';
import AddUserToProjectModal from './components/AddUserToProjectModal/AddUserToProjectModal';
import ChangeColumnName from './components/ChangeColumnName/ChangeColumnName';
import DeleteColumn from './components/DeleteColumModal/DeleteColumn';
import EditProjectInfo from './components/EditProjectInfo/EditProjectInfo';
import Tag from './components/Tag/Tag';
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

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    dispatch(
      moveTask({
        sourceIndex: source.index,
        destinationIndex: destination.index,
        sourceColId: source.droppableId,
        destColId: destination.droppableId,
      }),
    );
  };

  const handleOpenAddColumnModal = () => {
    dispatch(setProcessingColumnData(null));
    dispatch(setChangeColumnNameModalOpen(true));
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

  const handleTaskClick = (task: SelectedTaskInfo) => {
    dispatch(setIsTaskInfoModalOpened(true));
    dispatch(setSelectedTask(task));
  };

  useEffect(() => {
    if (boardId) {
      dispatch(fetchCanBanBoardById(boardId));
    }
  }, [dispatch, boardId]);

  if (canBanStatus === Status.LOADING) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrapper}>
      {currentUserProfile?._id === creatorId ? (
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
          {columns.map((column) => (
            <div className={styles.column} key={column._id}>
              <div className={styles.columnHeader}>
                <h3 className={styles.columnTitle}>{column.title}</h3>

                {currentUserProfile?._id === creatorId ? (
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
                ) : null}
              </div>
              <Droppable droppableId={column._id}>
                {(provided) => (
                  <div
                    className={styles.taskList}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            onClick={() => {
                              handleTaskClick({
                                task: task,
                                columnId: column._id,
                              });
                            }}
                            className={styles.task}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className={styles.taskContent}>
                              <div className={styles.title}>{task.title}</div>
                              <div className={styles.assignedUsers}>
                                {task.assignedTo.slice(0, 3).map((user) => (
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
                                <Tag tag={tag} key={tag.id} />
                              ))}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <button
                className={styles.addTaskButton}
                onClick={() => {
                  handleTaskClick({ task: null, columnId: column._id });
                }}
              >
                + {t('addCanBanTask')}
              </button>
            </div>
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

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default withLoginRedirect(CanBan);
