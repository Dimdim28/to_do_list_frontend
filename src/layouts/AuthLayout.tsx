import { Suspense, FC } from "react";
import { Outlet } from "react-router";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Preloader from "../components/FallBackPreloader/FallBackPreloader";

const AuthLayout: FC = () => {
  return (
    <>
      <Header links={[]} />
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
      <Footer links={[]} />
    </>
  );
};

export default AuthLayout;
