import React, { Suspense } from "react";
import { Outlet } from "react-router";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Preloader from "../components/Preloader/Preloader";

const PageLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default PageLayout;
