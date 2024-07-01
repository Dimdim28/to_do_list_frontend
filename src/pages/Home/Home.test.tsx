import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import Home from './Home';
import store from '../../redux/store';
import { TranslationKeys } from '../../types';

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: (str: any) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe('Home', () => {
  test('renders without errors', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

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
