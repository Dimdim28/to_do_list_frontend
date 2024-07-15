import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import store from '../../../redux/store';
import { TranslationKeys } from '../../../types/shared';

import FiltersBar from './FiltersBar';

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
        <FiltersBar />
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
