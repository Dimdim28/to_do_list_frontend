import { FC } from 'react';
import { Navigate } from 'react-router';

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

  if (isAuth && isChecked && needsEmailVerification) {
    return <Navigate to={ROUTES.EMAIL_CONFIRMATION_REQUIRED} />;
  }

  if (!isAuth && isChecked) {
    return <Navigate to={`${ROUTES.AUTH}/${ROUTES.LOGIN}`} />;
  }

  return <Component />;
};

export default withLoginRedirect;
