import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '../../components/common/Modal/Modal';
import {
  moveTask,
  setChangeColumnNameModalOpen,
  setEditingColumnData,
} from '../../redux/slices/canban/canban';
import {
  isChangeColumnNameModalOpen,
  selectColumns,
} from '../../redux/slices/canban/selectors';
import { Column } from '../../redux/slices/canban/type';
import ChangeColumnName from '../Board/components/ChangeColumnName/ChangeColumnName';

import styles from './CanBan.module.scss';

const CanBan = () => {
  const dispatch = useDispatch();
  const columns = useSelector(selectColumns);
  const isModalOpen = useSelector(isChangeColumnNameModalOpen);

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
    dispatch(setEditingColumnData(null)); // Очищаем редактируемую колонку
    dispatch(setChangeColumnNameModalOpen(true));
  };

  const handleOpenEditColumnModal = (column: Column) => {
    dispatch(
      setEditingColumnData({ columnId: column.id, title: column.title }),
    );
    dispatch(setChangeColumnNameModalOpen(true));
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
                <button
                  className={styles.editColumnButton}
                  onClick={() => handleOpenEditColumnModal(column)}
                >
                  Edit
                </button>
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
              <button className={styles.addTaskButton} onClick={() => {}}>
                + Add Task
              </button>
            </div>
          ))}
        </div>
      </DragDropContext>

      {isModalOpen && (
        <Modal
          active={isModalOpen}
          setActive={() => dispatch(setChangeColumnNameModalOpen(false))}
          ChildComponent={ChangeColumnName}
          childProps={{}}
        />
      )}
    </div>
  );
};

export default CanBan;
