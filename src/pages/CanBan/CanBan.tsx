import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './CanBan.module.scss';

const initialData = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      tasks: ['Task 1', 'Task 2', 'Task 3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      tasks: ['Task 4', 'Task 5'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      tasks: ['Task 6'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const CanBan = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return; // Если элемент был сброшен вне колонок
    }

    if (source.droppableId === destination.droppableId) {
      // Перемещение внутри одной колонки
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
      // Перемещение между колонками
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

  return (
    <div className={styles.wrapper}>
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
                    <h3 className={styles.columnTitle}>{column.title}</h3>
                    <div className={styles.taskList}>
                      {column.tasks.map((task, index) => (
                        <Draggable key={task} draggableId={task} index={index}>
                          {(provided) => (
                            <div
                              className={styles.task}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {task}
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
