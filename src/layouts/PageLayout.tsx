import { Suspense, FC } from "react";
import { Outlet } from "react-router";

import FAQFooter from "../components/FAQFooter/FAQFooter";
import Header from "../components/Header/Header";
import Preloader from "../components/FallBackPreloader/FallBackPreloader";
import { HEADER_LINKS } from "../App";

const PageLayout: FC = () => {
  return (
    <>
      <Header links={HEADER_LINKS} />
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
      <FAQFooter links={[]} />
    </>
  );
};

export default PageLayout;
