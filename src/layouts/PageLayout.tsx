import { FC,Suspense } from "react";
import { Outlet } from "react-router";

import { HEADER_LINKS } from "../App";
import Preloader from "../components/FallBackPreloader/FallBackPreloader";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const PageLayout: FC = () => {
  return (
    <>
      <Header links={HEADER_LINKS} />
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
      <Footer links={[]} />
    </>
  );
};

export default PageLayout;
