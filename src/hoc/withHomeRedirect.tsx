import { FC } from 'react';
import { Navigate } from 'react-router';

import { useAppSelector } from '../hooks';
import { selectIsAuth, selectIsChecked } from '../redux/slices/auth/selectors';
import ROUTES from '../routes';

// eslint-disable-next-line react/display-name
export const withHomeRedirect = (Component: FC<any>) => () => {
  const isAuth = useAppSelector(selectIsAuth);
  const isChecked = useAppSelector(selectIsChecked);
  if (isAuth && isChecked) return <Navigate to={ROUTES.HOME} />;
  return <Component />;
};

export default withHomeRedirect;
