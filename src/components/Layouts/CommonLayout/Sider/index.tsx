import { Layout, Menu } from "antd";
import { useState } from "react";

import { SIDER_ITEMS } from "@/constants/common";
import { useSetRecoilState } from "recoil";
import { breadCrumbAtom } from "@/modules/breadcrumb";
import { useNavigate } from "react-router-dom";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";

const { Sider } = Layout;

const CommonSider = () => {
  const setBreadCrumb = useSetRecoilState(breadCrumbAtom);

  const navigate = useNavigate();

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
        defaultSelectedKeys={["dashboard"]}
        items={SIDER_ITEMS}
        onClick={handleClickSiderItem}
      />
    </Sider>
  );
};

export default CommonSider;
