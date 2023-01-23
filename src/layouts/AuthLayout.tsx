import React, { Suspense } from "react";
import { Outlet } from "react-router";
import Preloader from "../components/Preloader/Preloader";

const AuthLayout: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default AuthLayout;
