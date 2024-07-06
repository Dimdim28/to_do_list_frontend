import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';

import Name from './Name';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const mockToggleActive = jest.fn();
let store: any;

beforeEach(() => {
  store = mockStore({
    profile: {
      status: 'success',
    },
  });
});

describe('Name', () => {
  it('should render name container', () => {
    render(
      <Provider store={store}>
        <Name
          isNameEditing={false}
          setIsNameEditing={() => {}}
          name={'Ivan'}
          setName={() => {}}
          id={'22'}
        />
      </Provider>,
    );

    expect(screen.getByTestId('name-container')).toBeInTheDocument();
    expect(screen.getByTestId('name-component')).toBeInTheDocument();
    expect(screen.getByTestId('text-component')).toBeInTheDocument();
    expect(screen.getByTestId('edit-component')).toBeInTheDocument();
    expect(screen.getByTestId('pencil-component')).toBeInTheDocument();
  });

  it('should render input when isNameEditing is true', () => {
    render(
      <Provider store={store}>
        <Name
          isNameEditing={true}
          setIsNameEditing={() => {}}
          name={'Ivan'}
          setName={() => {}}
          id={'22'}
        />
      </Provider>,
    );

    expect(screen.getByTestId('name-container')).toBeInTheDocument();
    expect(screen.getByTestId('name-component')).toBeInTheDocument();
    expect(screen.getByTestId('input-name-component')).toBeInTheDocument();
    expect(screen.getByTestId('check-component')).toBeInTheDocument();
    expect(screen.getByTestId('close-component')).toBeInTheDocument();
  });

  it('should render error message when status is error', () => {
    render(
      <Provider store={store}>
        <Name
          isNameEditing={false}
          setIsNameEditing={() => {}}
          name={'Ivan'}
          setName={() => {}}
          id={'22'}
        />
      </Provider>,
    );

    expect(screen.getByTestId('name-container')).toBeInTheDocument();
  });

  it('renders without errors', () => {
    expect(screen.queryByTestId('error')).toBeNull();
  });

  it('should call mockToggleActive when edit button is clicked', () => {
    render(
      <Provider store={store}>
        <Name
          isNameEditing={false}
          setIsNameEditing={mockToggleActive}
          name={'Name'}
          setName={() => {}}
          id={'22'}
        />
      </Provider>,
    );
    fireEvent.click(screen.getByTestId('edit-component'));

    expect(mockToggleActive).toHaveBeenCalled();
  });

  it('should call mockToggleActive when cancel button is clicked', () => {
    render(
      <Provider store={store}>
        <Name
          isNameEditing={true}
          setIsNameEditing={mockToggleActive}
          name={'Name'}
          setName={() => {}}
          id={'22'}
        />
      </Provider>,
    );
    fireEvent.click(screen.getByTestId('close-component'));

    expect(mockToggleActive).toHaveBeenCalled();
  });
});
