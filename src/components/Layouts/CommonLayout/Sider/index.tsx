import { Layout, Menu } from "antd";
import { useMemo, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";

import { breadCrumbAtom } from "@/modules/breadcrumb";
import { currentUserAtom } from "@/modules/currentUser";
import { getSiderByRoles } from "@/utils";

const { Sider } = Layout;

const CommonSider = () => {
  const setBreadCrumb = useSetRecoilState(breadCrumbAtom);
  const currentUser = useRecoilValue(currentUserAtom);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = useMemo(() => {
    const currentRole = currentUser?.employee?.role;
    if (currentRole) {
      return getSiderByRoles(currentRole);
    }
    return [];
  }, [currentUser]);

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
        items={menuItems}
        onClick={handleClickSiderItem}
      />
    </Sider>
  );
};

export default CommonSider;
