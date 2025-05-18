import { FC,Suspense } from "react";
import { Outlet } from "react-router";

import Preloader from "../components/FallBackPreloader/FallBackPreloader";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

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
