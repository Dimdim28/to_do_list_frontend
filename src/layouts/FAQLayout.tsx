import { Suspense, FC } from "react";
import { Outlet } from "react-router";

import FAQFooter from "../components/FAQFooter/FAQFooter";
import Preloader from "../components/FallBackPreloader/FallBackPreloader";
import Header from "../components/Header/Header";

const HomeLayout: FC = () => {
  return (
    <>
      <Header links={[]} />
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
      <FAQFooter />
    </>
  );
};

export default HomeLayout;
