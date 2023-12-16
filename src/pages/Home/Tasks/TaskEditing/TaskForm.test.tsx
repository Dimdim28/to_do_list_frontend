import { Provider } from 'react-redux';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import TaskForm from './TaskForm';
import taskAPI from '../../../../api/taskAPI';
import { Status } from '../../../../types';
import store from '../../../../redux/store';

jest.mock('../../../../api/taskAPI');

describe('TaskForm', () => {
  const childProps = {
    _id: '1',
    title: 'Task Title',
    user: 'dsgf',
    createdAt: 'ffdgf',
    updatedAt: 'ffdgf',
    description: 'Task Description',
    categories: [
      { _id: '1', color: 'blue', title: 'Category 1' },
      { _id: '2', color: 'red', title: 'Category 2' },
    ],
    deadline: '2023-01-01',
    isCompleted: false,
    fetchTasks: jest.fn(),
    setCurrentPage: () => {},
    taskFetchingParams: {},
    length: 10,
    subtasks: [],
  };

  test('renders the form fields and buttons', () => {
    render(
      <Provider store={store}>
        <TaskForm toggleActive={jest.fn()} childProps={childProps} />
      </Provider>,
    );

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
    expect(screen.getByLabelText('taskHasDeadline')).toBeInTheDocument();
    expect(screen.getByLabelText('taskCompleted')).toBeInTheDocument();
    expect(screen.getByText('cancel')).toBeInTheDocument();
    expect(screen.getByText('submit')).toBeInTheDocument();
  });

  test('calls toggleActive with false on cancel button click', () => {
    const toggleActiveMock = jest.fn();
    render(
      <Provider store={store}>
        <TaskForm toggleActive={toggleActiveMock} childProps={childProps} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('cancel'));
    expect(toggleActiveMock).toHaveBeenCalledWith(false);
  });

  test('displays error message when task submission fails', async () => {
    const errorMessage = 'Error submitting task';
    (taskAPI.edittask as any).mockResolvedValue({
      status: Status.ERROR,
      message: errorMessage,
    });
    render(
      <Provider store={store}>
        <TaskForm toggleActive={jest.fn()} childProps={childProps} />{' '}
      </Provider>,
    );

    fireEvent.click(screen.getByText('submit'));
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
