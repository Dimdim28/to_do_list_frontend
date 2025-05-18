import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import store from '../../../../redux/store';

import ProfileData from './ProfileData';

const renderProfileData = () => {
  render(
    <Provider store={store}>
      <ProfileData />
    </Provider>,
  );
};

describe('ProfileData', () => {
  beforeEach(() => {
    renderProfileData();
  });

  it('renders without errors', () => {
    expect(screen.queryByTestId('error')).toBeNull();
  });
});
