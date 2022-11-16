import { Layout, Menu } from "antd";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";

import { SIDER_ITEMS } from "@/constants/common";
import { breadCrumbAtom } from "@/modules/breadcrumb";

const { Sider } = Layout;

const CommonSider = () => {
  const setBreadCrumb = useSetRecoilState(breadCrumbAtom);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const handleClickSiderItem = ({ keyPath, key }: any) => {
    const newBreadCrumb = keyPath
      ?.map((item: string) => {
        if (item === "/") return "HOME";
        return item.replaceAll(/[\/-]/g, " ").trim().toUpperCase();
      })
      .reverse();
    setBreadCrumb(newBreadCrumb);
    navigate(key);
  };

  return (
    <Sider
      width={300}
      collapsed={collapsed}
      collapsible
      onCollapse={setCollapsed}
      className="common-sider"
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["/dashboard"]}
        selectedKeys={[pathname]}
        items={SIDER_ITEMS}
        onClick={handleClickSiderItem}
      />
    </Sider>
  );
};

export default CommonSider;
