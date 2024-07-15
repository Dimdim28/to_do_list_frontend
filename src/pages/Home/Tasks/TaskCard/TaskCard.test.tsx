import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import store from '../../../../redux/store';
import { Task } from '../../../../types/entities/Task';

import TaskCard from './TaskCard';

describe('TaskCard', () => {
  const task: Task = {
    _id: '1',
    title: 'Task Title',
    description: 'Task Description',
    deadline: '2023-06-30',
    isCompleted: false,
    categories: [
      { _id: '1', color: 'blue', title: 'Category 1' },
      { _id: '2', color: 'red', title: 'Category 2' },
    ],
    subtasks: [],
    type: 'task',
    links: [],
    dateOfCompletion: null,
  };

  const mockSetTaskEditing = jest.fn();
  const mockSetTaskProps = jest.fn();
  const mockSetTaskDeleting = jest.fn();
  const mockSetTaskSharing = jest.fn();
  const mockSetCurrentPage = jest.fn();
  const mockSetTaskAddingLink = jest.fn();
  const mockSetTaskInfo = jest.fn();
  const updateTaskStatus = jest.fn();

  test('renders task card correctly', () => {
    render(
      <Router>
        <Provider store={store}>
          <TaskCard
            task={task}
            setTaskEditing={mockSetTaskEditing}
            setTaskProps={mockSetTaskProps}
            setTaskDeleting={mockSetTaskDeleting}
            setTaskSharing={mockSetTaskSharing}
            setTaskInfo={mockSetTaskInfo}
            setCurrentPage={mockSetCurrentPage}
            setTaskAddingLink={mockSetTaskAddingLink}
            updateTaskStatus={updateTaskStatus}
          />
        </Provider>
      </Router>,
    );

    expect(screen.getByText('Task Title')).toBeInTheDocument();
    expect(screen.getByText('Task Description')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
  });

  test('calls setTaskEditing and setTaskProps correctly on edit icon click', () => {
    render(
      <Router>
        <Provider store={store}>
          <TaskCard
            task={task}
            setTaskEditing={mockSetTaskEditing}
            setTaskProps={mockSetTaskProps}
            setTaskDeleting={mockSetTaskDeleting}
            setTaskSharing={mockSetTaskSharing}
            setTaskInfo={mockSetTaskInfo}
            setCurrentPage={mockSetCurrentPage}
            setTaskAddingLink={mockSetTaskAddingLink}
            updateTaskStatus={updateTaskStatus}
          />
        </Provider>
        ,
      </Router>,
    );

    fireEvent.click(screen.getByTestId('edit-icon'));
    expect(mockSetTaskProps).toHaveBeenCalledWith({
      ...task,
      isAssignedUser: false,
    });
    expect(mockSetTaskEditing).toHaveBeenCalledWith(true);
  });

  //TODO for Ivan: add tests for delete and share icons, handle all cases when we deal with subtask ot main task, are we a creator or an assigned user
  //TODO for Ivan: remoxe next tests or use them as a base for your tests for the previous TODO
});
