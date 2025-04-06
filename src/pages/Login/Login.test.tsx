import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { render, screen } from '@testing-library/react';

import store from '../../redux/store';

import Login from './Login';

const clientID = process.env.REACT_GOOGLE_CLIENT_ID || '';

describe('Login', () => {
  test('renders the login form', () => {
    render(
      <GoogleOAuthProvider clientId={clientID}>
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>{' '}
      </GoogleOAuthProvider>,
    );

    expect(screen.getByText('email')).toBeInTheDocument();
    expect(screen.getByText('password')).toBeInTheDocument();
    expect(screen.getByText('signIn')).toBeInTheDocument();
    expect(screen.getByText('signUp')).toBeInTheDocument();
  });
});
