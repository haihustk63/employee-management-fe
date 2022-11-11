import React, { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const CommonLayout: FC<{ children: any }> = ({ children }) => {
  return (
    <div className="common-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
