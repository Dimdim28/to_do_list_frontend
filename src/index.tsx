import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import store from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const clientID = process.env.REACT_GOOGLE_CLIENT_ID || '';
root.render(
  <>
    <GoogleOAuthProvider clientId={clientID}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </>,
);

reportWebVitals();
