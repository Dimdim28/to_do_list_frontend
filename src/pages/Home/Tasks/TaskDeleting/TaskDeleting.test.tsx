import { render, fireEvent, screen } from '@testing-library/react';

import TaskDeleting from './TaskDeleting';
import taskAPI from '../../../../api/taskAPI';
import { Status } from '../../../../types';
import store from '../../../../redux/store';
import { Provider } from 'react-redux';

jest.mock('../../../../api/taskAPI');

describe('TaskDeleting', () => {
  const childProps = {
    _id: '1',
    title: 'abcd',
    setCurrentPage: () => {},
    length: 10,
    user: 'fgd',
    createdAt: '2021-03-20',
    updatedAt: '2021-03-20',
    subtasks: [],
  };

  test('displays the confirmation message and buttons', () => {
    render(
      <Provider store={store}>
        <TaskDeleting toggleActive={jest.fn()} childProps={childProps} />
      </Provider>,
    );

    expect(screen.getByText('reallyTask')).toBeInTheDocument();
    expect(screen.getByText('abcd')).toBeInTheDocument();
    expect(screen.getByText('no')).toBeInTheDocument();
    expect(screen.getByText('yes')).toBeInTheDocument();
  });

  test('calls toggleActive with false on cancel button click', () => {
    const toggleActiveMock = jest.fn();
    render(
      <Provider store={store}>
        <TaskDeleting toggleActive={toggleActiveMock} childProps={childProps} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('no'));
    expect(toggleActiveMock).toHaveBeenCalledWith(false);
  });

  test('calls taskAPI.deleteTask and fetchTasks on submit button click', async () => {
    (taskAPI.deleteTask as any).mockResolvedValue({
      status: Status.SUCCESS,
      message: 'Task deleted successfully',
    });
    render(
      <Provider store={store}>
        <TaskDeleting toggleActive={jest.fn()} childProps={{ ...childProps }} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('yes'));

    expect(taskAPI.deleteTask).toHaveBeenCalledWith('1');
  });

  test('displays error message when deletion fails', async () => {
    const errorMessage = 'Error deleting task';
    (taskAPI.deleteTask as any).mockResolvedValue({
      status: Status.ERROR,
      message: errorMessage,
    });
    render(
      <Provider store={store}>
        <TaskDeleting toggleActive={jest.fn()} childProps={childProps} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('yes'));
    await screen.findByText(errorMessage);
  });

  test('displays preloader while deleting', async () => {
    render(
      <Provider store={store}>
        <TaskDeleting toggleActive={jest.fn()} childProps={childProps} />
      </Provider>,
    );

    (taskAPI.deleteTask as any).mockImplementation(() => {
      return new Promise(() => {}); // Create a promise that never resolves
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    expect(screen.queryByText('cancel')).not.toBeInTheDocument();
    expect(screen.queryByText('submit')).not.toBeInTheDocument();
    expect(screen.getByTestId('preloader')).toBeInTheDocument();
  });
});
