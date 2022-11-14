import { breadCrumbAtom } from "@/modules/breadcrumb";
import { Breadcrumb, Layout } from "antd";
import React from "react";
import { useRecoilValue } from "recoil";

import CommonFooter from "./Footer";
import CommonHeader from "./Header";
import CommonSider from "./Sider";

const { Content } = Layout;

const CommonLayout: React.FC<{ children: any }> = ({ children }) => {
  const breadCrumb = useRecoilValue(breadCrumbAtom);

  return (
    <Layout className="common-layout">
      <CommonHeader />
      <Layout>
        <CommonSider />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {breadCrumb?.map((item: string, index: number) => {
              return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
            })}
          </Breadcrumb>
          <Content>{children}</Content>
          <CommonFooter />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CommonLayout;
