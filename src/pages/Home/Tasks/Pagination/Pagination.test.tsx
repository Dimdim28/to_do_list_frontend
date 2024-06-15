import { render, screen } from '@testing-library/react';

import Pagination from './Pagination';
import store from '../../../../redux/store';
import { Provider } from 'react-redux';

describe('Pagination', () => {
  test('renders pagination buttons correctly', () => {
    render(
      <Provider store={store}>
        <Pagination currentPage={3} totalPages={5} />
      </Provider>,
    );

    expect(screen.getByText('<<')).toBeInTheDocument();
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByText('>>')).toBeInTheDocument();
  });

  test('disables buttons correctly based on currentPage and totalPages', () => {
    render(
      <Provider store={store}>
        <Pagination currentPage={1} totalPages={5} />
      </Provider>,
    );

    expect(screen.getByText('<<')).toHaveClass('disabledPageButton');
    expect(screen.getByText('<')).toHaveClass('disabledPageButton');
    expect(screen.getByText('1')).toHaveClass('activePageButton');
    expect(screen.getByText('>')).not.toHaveClass('disabledPageButton');
    expect(screen.getByText('>>')).not.toHaveClass('disabledPageButton');
  });
});
