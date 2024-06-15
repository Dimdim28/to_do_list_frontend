import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import store from '../../../redux/store';
import { TranslationKeys } from '../../../types';
import FiltersBar from './FiltersBar';

const mockDate = 'week';
const mockSetDate = jest.fn();
const mockIsCompleted = 'all';
const mockSetIsCompleted = jest.fn();
const mockCategories = ['1', '2'];
const mockSetCategories = jest.fn();
const mockTaskFetchingParams = {};

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: (str: any) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe('FiltersBar', () => {
  test('renders the FiltersBar component with categories and filters', () => {
    render(
      <Provider store={store}>
        <FiltersBar
          date={mockDate}
          setDate={mockSetDate}
          isCompleted={mockIsCompleted}
          setIsCompleted={mockSetIsCompleted}
          categories={mockCategories}
          setCategories={mockSetCategories}
          taskFetchingParams={mockTaskFetchingParams}
        />
      </Provider>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText(TranslationKeys.Categories)).toBeInTheDocument();
    expect(screen.getByText(TranslationKeys.DateAndStatus)).toBeInTheDocument();
    expect(
      screen.getByText(TranslationKeys.DeadlineFilters),
    ).toBeInTheDocument();
    expect(
      screen.getByText(TranslationKeys.CompletionStatus),
    ).toBeInTheDocument();
  });
});
