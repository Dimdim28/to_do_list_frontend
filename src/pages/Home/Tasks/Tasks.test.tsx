import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';

import Tasks from './Tasks';
import { getTask } from '../../../api/taskAPI';
import store from '../../../redux/store';

describe('Tasks', () => {
  const taskFetchingParams: getTask = {
    page: 1,
    isCompleted: false,
    deadline: '',
    categories: [],
  };

  test('renders without errors', () => {
    render(
      <Provider store={store}>
        <Tasks taskFetchingParams={taskFetchingParams} />
      </Provider>,
    );

    expect(screen.getByText('addTask')).toBeInTheDocument();
  });

  test("clicking on 'Create task +' opens the task editing modal", () => {
    render(
      <Provider store={store}>
        <Tasks taskFetchingParams={taskFetchingParams} />
      </Provider>,
    );

    const createTaskButton = screen.getByText('addTask');
    fireEvent.click(createTaskButton);

    expect(screen.getByText('cancel')).toBeInTheDocument();
    expect(screen.getByText('submit')).toBeInTheDocument();
  });
});
