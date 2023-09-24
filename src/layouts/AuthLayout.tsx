import { Suspense, FC } from "react";
import { Outlet } from "react-router";

import Footer from "../components/Footer/Footer";
import LogRegHeader from "../components/LogRegHeader/LogRegHeader";
import Preloader from "../components/FallBackPreloader/FallBackPreloader";

const AuthLayout: FC = () => {
  return (
    <>
      <LogRegHeader />
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default AuthLayout;
