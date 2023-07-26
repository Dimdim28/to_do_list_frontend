import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import Login from './Login';
import store from '../../redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Login', () => {
  test('renders the login form', () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();
    expect(screen.getByText('password')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });
});