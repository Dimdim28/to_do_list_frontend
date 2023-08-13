import { Suspense, FC } from "react";
import { Outlet } from "react-router";

import Preloader from "../components/Preloader/Preloader";

const AuthLayout: FC = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default AuthLayout;
