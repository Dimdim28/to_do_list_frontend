import { Suspense, FC } from "react";
import { Outlet } from "react-router";

import FAQFooter from "../components/FAQFooter/FAQFooter";
import Header from "../components/Header/Header";
import Preloader from "../components/FallBackPreloader/FallBackPreloader";

const AuthLayout: FC = () => {
  return (
    <>
      <Header links={[]} />
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
      <FAQFooter links={[]} />
    </>
  );
};

export default AuthLayout;
