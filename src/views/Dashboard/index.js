import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Aside } from "./components/Aside";

export const DashBoard = () => {
  return (
    <>
      <Header/>
      <Aside />
      <Outlet />
      <Footer />
    </>
  );
};
