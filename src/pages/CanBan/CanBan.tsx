import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from '../../components/common/Modal/Modal';
import { useAppSelector } from '../../hooks';
import {
  moveTask,
  setChangeColumnNameModalOpen,
  setDeleteColumnModalOpen,
  setIsTaskInfoModalOpened,
  setProcessingColumnData,
  setSelectedTask,
} from '../../redux/slices/canban/canban';
import {
  isChangeColumnNameModalOpen,
  isDeleteColumnModalOpen,
  selectColumns,
} from '../../redux/slices/canban/selectors';
import { Column, Task } from '../../redux/slices/canban/type';

import ChangeColumnName from './components/ChangeColumnName/ChangeColumnName';
import DeleteColumn from './components/DeleteColumModal/DeleteColumn';
import TaskInfoSideBar from './components/TaskInfoSideBar/TaskInfoSideBar';

import styles from './CanBan.module.scss';

const CanBan = () => {
  const dispatch = useDispatch();
  const columns = useAppSelector(selectColumns);
  const isEditColumnNameModalOpen = useAppSelector(isChangeColumnNameModalOpen);
  const isDeleteModalOpened = useAppSelector(isDeleteColumnModalOpen);

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
      setProcessingColumnData({ columnId: column.id, title: column.title }),
    );
    dispatch(setChangeColumnNameModalOpen(true));
  };

  const handleOpenDeleteColumnModal = (column: Column) => {
    dispatch(
      setProcessingColumnData({ columnId: column.id, title: column.title }),
    );
    dispatch(setDeleteColumnModalOpen(true));
  };

  const handleTaskClick = (task: Task | null) => {
    dispatch(setIsTaskInfoModalOpened(true));
    dispatch(setSelectedTask(task));
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.addColumnButton}
        onClick={handleOpenAddColumnModal}
      >
        Add Column
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.columns}>
          {columns.map((column) => (
            <div className={styles.column} key={column.id}>
              <div className={styles.columnHeader}>
                <h3 className={styles.columnTitle}>{column.title}</h3>

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
              </div>
              <Droppable droppableId={column.id}>
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
                              handleTaskClick(task);
                            }}
                            className={styles.task}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className={styles.taskContent}>
                              {task.content}
                            </div>
                            <div className={styles.assignedUsers}>
                              {task.assignedTo.map((user, idx) => (
                                <img
                                  key={idx}
                                  src={user}
                                  alt="user"
                                  className={styles.userAvatar}
                                />
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
                  handleTaskClick(null);
                }}
              >
                + Add Task
              </button>
            </div>
          ))}
        </div>
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

      <TaskInfoSideBar />
    </div>
  );
};

export default CanBan;
