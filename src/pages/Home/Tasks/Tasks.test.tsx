import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import Tasks from './Tasks';
import store from '../../../redux/store';

describe('Tasks', () => {
  test('renders without errors', () => {
    render(
      <Provider store={store}>
        <Tasks />
      </Provider>,
    );

    expect(screen.getByText('addTask')).toBeInTheDocument();
  });

  // test("clicking on 'Create task +' opens the task editing modal", () => {
  //   render(
  //     <Provider store={store}>
  //       <Tasks />
  //     </Provider>,
  //   );

  //   const createTaskButton = screen.getByText('addTask');
  //   fireEvent.click(createTaskButton);

  //   expect(screen.getByText('cancel')).toBeInTheDocument();
  //   expect(screen.getByText('submit')).toBeInTheDocument();
  // });
});
