import { Layout } from "antd";
import { FC } from "react";
import Header from "./Header";

const CandidateLayout: FC<{ children: any }> = ({ children }) => {
  return (
    <Layout className="candidate-layout">
      <Header />
      <main className="content">{children}</main>
      {/* <Footer /> */}
    </Layout>
  );
};

export default CandidateLayout;
