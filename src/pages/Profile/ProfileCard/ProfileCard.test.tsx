import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import ProfileCard from './ProfileCard';

const mockStore = configureStore([]);
let store: any;

beforeEach(() => {
  store = mockStore({
    profile: {
      data: {
        _id: '22',
        username: 'Ivan',
        password: 'NotToday',
        email: 'ivan@mail.com',
        avatar: null,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-11-18T12:00:00.000Z',
        avatarUrl: null,
      },
      status: 'success',
      stats: [],
      message: '',
    },
  });
});

const renderProfileCard = () => {
  render(
    <Provider store={store}>
      <ProfileCard
        ownerId=""
        isNameEditing={false}
        setIsNameEditing={() => {}}
        name={'Ivan'}
        setName={() => {}}
        id={'22'}
        setIsExiting={() => {}}
        setIspassEditing={() => {}}
        setIsAccountDeleting={() => {}}
        isAccountDeleting={false}
        isExiting={false}
      />
    </Provider>,
  );
};

describe('ProfileCard', () => {
  it('should render profile card', () => {
    renderProfileCard();

    expect(screen.getByTestId('profile-card-container')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-container')).toBeInTheDocument();
    expect(screen.getByTestId('info')).toBeInTheDocument();
    expect(screen.getByTestId('name-container')).toBeInTheDocument();
  });
});
