import { FC } from 'react';
import { Navigate } from 'react-router';

import { useAppSelector } from '../hooks';
import { selectIsAuth, selectIsChecked } from '../redux/slices/auth/selectors';
import ROUTES from '../routes';

export const withLoginRedirect = (Component: FC<unknown>) => () => {
  const isAuth = useAppSelector(selectIsAuth);
  const isChecked = useAppSelector(selectIsChecked);
  if (!isAuth && isChecked)
    return <Navigate to={`${ROUTES.AUTH}/${ROUTES.LOGIN}`} />;

  return <Component />;
};

export default withLoginRedirect;
