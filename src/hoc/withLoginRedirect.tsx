import { FC } from 'react';
import { Navigate } from 'react-router';

import Preloader from '../components/Preloader/Preloader';
import { useAppSelector } from '../hooks';
import {
  selectIsAuth,
  selectIsChecked,
  selectNeedsEmailVerification,
} from '../redux/slices/auth/selectors';
import ROUTES from '../routes';

// eslint-disable-next-line react/display-name
export const withLoginRedirect = (Component: FC<unknown>) => () => {
  const isAuth = useAppSelector(selectIsAuth);
  const isChecked = useAppSelector(selectIsChecked);
  const needsEmailVerification = useAppSelector(selectNeedsEmailVerification);

  if (!isChecked) {
    return <Preloader />;
  }

  if (isAuth && needsEmailVerification) {
    return <Navigate to={ROUTES.EMAIL_CONFIRMATION_REQUIRED} replace />;
  }

  if (!isAuth) {
    return <Navigate to={`${ROUTES.AUTH}/${ROUTES.LOGIN}`} replace />;
  }

  return <Component />;
};

export default withLoginRedirect;
