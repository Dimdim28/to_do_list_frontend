import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './CanBan.module.scss';

const initialData = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      tasks: [
        {
          id: 'task-1',
          content: 'Task 1',
          assignedTo: [
            'https://res.cloudinary.com/dmbythxia/image/upload/v1704405267/1704405266565-avatar.jpg',
          ],
        },
        {
          id: 'task-2',
          content: 'Task 2',
          assignedTo: [
            'https://res.cloudinary.com/dmbythxia/image/upload/v1726510901/1726510900129-avatar.jpg',
            'https://res.cloudinary.com/dmbythxia/image/upload/v1704405267/1704405266565-avatar.jpg',
          ],
        },
      ],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      tasks: [
        {
          id: 'task-3',
          content: 'Task 3',
          assignedTo: [
            'https://res.cloudinary.com/dmbythxia/image/upload/v1704405267/1704405266565-avatar.jpg',
          ],
        },
      ],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      tasks: [
        {
          id: 'task-4',
          content: 'Task 4',
          assignedTo: [
            'https://res.cloudinary.com/dmbythxia/image/upload/v1726510901/1726510900129-avatar.jpg',
          ],
        },
      ],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const CanBan = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const column = data.columns[source.droppableId];
      const tasks = Array.from(column.tasks);
      const [removed] = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, removed);

      const newColumn = {
        ...column,
        tasks,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
    } else {
      const startColumn = data.columns[source.droppableId];
      const finishColumn = data.columns[destination.droppableId];

      const startTasks = Array.from(startColumn.tasks);
      const [removed] = startTasks.splice(source.index, 1);

      const finishTasks = Array.from(finishColumn.tasks);
      finishTasks.splice(destination.index, 0, removed);

      setData({
        ...data,
        columns: {
          ...data.columns,
          [startColumn.id]: {
            ...startColumn,
            tasks: startTasks,
          },
          [finishColumn.id]: {
            ...finishColumn,
            tasks: finishTasks,
          },
        },
      });
    }
  };

  const addTask = (columnId) => {
    const taskContent = prompt('Enter task content:');
    if (!taskContent) return;

    const newTask = {
      id: `task-${Date.now()}`,
      content: taskContent,
      assignedTo: [],
    };

    const column = data.columns[columnId];
    column.tasks.push(newTask);

    setData({
      ...data,
      columns: {
        ...data.columns,
        [columnId]: column,
      },
    });
  };

  const addColumn = () => {
    const columnName = prompt('Enter column name:');
    if (!columnName) return;

    const newColumnId = `column-${Date.now()}`;
    const newColumn = {
      id: newColumnId,
      title: columnName,
      tasks: [],
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: [...data.columnOrder, newColumnId],
    });
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.addColumnButton} onClick={addColumn}>
        Add Column
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.columns}>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            return (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <div
                    className={styles.column}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className={styles.columnHeader}>
                      <h3 className={styles.columnTitle}>{column.title}</h3>
                      <button
                        className={styles.addTaskButton}
                        onClick={() => addTask(column.id)}
                      >
                        + Add Item
                      </button>
                    </div>
                    <div className={styles.taskList}>
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
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default CanBan;
