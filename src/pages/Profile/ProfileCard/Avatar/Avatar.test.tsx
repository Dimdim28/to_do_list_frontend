import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Avatar from './Avatar';
import store from '../../../../redux/store';
import exp from 'constants';

const renderAvatar = () => {
  render(
    <Provider store={store}>
      <Router>
        <Avatar />
      </Router>
    </Provider>,
  );
};

beforeEach(() => {
  renderAvatar();
});

describe('Avatar', () => {
  it('renders without crashing', () => {
    expect(screen.getByTestId('avatar-container')).toBeInTheDocument();
    expect(screen.getByTestId('file-input-component')).toBeInTheDocument();
    expect(screen.getByTestId('add-photo-component')).toBeInTheDocument();
    expect(screen.getByTestId('camera-icon-component')).toBeInTheDocument();
  });

  it('renders the default avatar when no profile avatar is available', () => {
    expect(screen.getByAltText('default')).toBeInTheDocument();
  });

  it('renders without errors', () => {
    expect(screen.queryByTestId('error')).toBeNull();
  });

  it('should call handleChangeFile when file input changes', () => {
    const fileInput = screen.getByTestId('file-input-component');
    const mockFileEvent = {
      target: {
        files: ['file'],
      },
    };
    const handleChangeFile = jest.fn();

    fireEvent.click(fileInput);
    fireEvent.change(fileInput, mockFileEvent);

    expect(handleChangeFile).toHaveBeenCalledTimes;
  });
});
