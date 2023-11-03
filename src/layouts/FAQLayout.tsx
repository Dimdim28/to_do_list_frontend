import { Suspense, FC } from "react";
import { Outlet } from "react-router";

import Footer from "../components/Footer/Footer";
import Preloader from "../components/FallBackPreloader/FallBackPreloader";
import Header from "../components/Header/Header";
import { FOOTER_LINKS } from "../App";

const HomeLayout: FC = () => {
  return (
    <>
      <Header links={[]} />
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
      <Footer links={FOOTER_LINKS} />
    </>
  );
};

export default HomeLayout;
