import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';

import Exit from './Exit';
import configureStore from 'redux-mock-store';

const mockToggleActive = jest.fn();
const mockStore = configureStore([]);
let store: any;

jest.mock('../../../../api/socketsAPI', () => ({
  closeConnection: jest.fn(),
}));

const renderDeleteProfile = (store: any) => {
  render(
    <Provider store={store}>
      <Exit toggleActive={() => {}} />
    </Provider>,
  );
};

describe('DeleteProfile', () => {
  it('should render delete profile container', () => {
    store = mockStore({
      profile: {
        status: 'success',
      },
    });
    renderDeleteProfile(store);

    expect(screen.getByTestId('exit-container')).toBeInTheDocument();
    expect(screen.getByTestId('are-you-sure-container')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-container')).toBeInTheDocument();
    expect(screen.getByTestId('submit-container')).toBeInTheDocument();
  });

  it('should render preloader when status is loading', () => {
    store = mockStore({
      profile: {
        status: 'loading',
      },
    });
    renderDeleteProfile(store);

    expect(screen.getByTestId('exit-container')).toBeInTheDocument();
    expect(screen.getByTestId('preloader-container')).toBeInTheDocument();
    expect(screen.getByTestId('preloader')).toBeInTheDocument();
  });

  it('should render error message when status is error', () => {
    store = mockStore({
      profile: {
        status: 'error',
      },
    });
    renderDeleteProfile(store);

    expect(screen.getByTestId('exit-container')).toBeInTheDocument();
  });

  it('renders without errors', () => {
    expect(screen.queryByTestId('error')).toBeNull();
  });

  it('should call mockToggleActive when cancel button is clicked', () => {
    store = mockStore({
      profile: {
        status: 'success',
      },
    });
    render(
      <Provider store={store}>
        <Exit toggleActive={mockToggleActive} />
      </Provider>,
    );
    fireEvent.click(screen.getByTestId('cancel-container'));

    expect(mockToggleActive).toHaveBeenCalled();
    expect(mockToggleActive).toHaveBeenCalledWith(false);
  });

  it('should call mockDispatch and mockToggleActive when submit button is clicked', () => {
    store = mockStore({
      profile: {
        status: 'success',
      },
    });
    render(
      <Provider store={store}>
        <Exit toggleActive={mockToggleActive} />
      </Provider>,
    );
    fireEvent.click(screen.getByTestId('submit-container'));

    expect(mockToggleActive).toHaveBeenCalled();
    expect(mockToggleActive).toHaveBeenCalledWith(false);
  });
});
