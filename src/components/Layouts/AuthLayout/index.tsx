import React, { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
