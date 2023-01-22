import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const PageLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PageLayout;
