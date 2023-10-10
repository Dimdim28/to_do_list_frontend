import { Suspense, FC } from "react";
import { Outlet } from "react-router";

import FAQFooter from "../components/FAQFooter/FAQFooter";
import SecondHeader from "../components/SecondHeader/SecondHeader";
import Preloader from "../components/FallBackPreloader/FallBackPreloader";

const HomeLayout: FC = () => {
  return (
    <>
      <SecondHeader />
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
      <FAQFooter />
    </>
  );
};

export default HomeLayout;
