import { FC } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sider from "./Sider";

const SkillTestLayout: FC<{ children: any }> = ({ children }) => {
  return (
    <div className="common-layout">
      <Sider />
      <div className="main">
        <Header />
        <main className="content">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default SkillTestLayout;
