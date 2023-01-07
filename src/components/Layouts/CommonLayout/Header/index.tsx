import React from "react";
import { Layout, Menu } from "antd";
import { HEADER_ITEMS } from "@/constants/common";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { breadCrumbAtom } from "@/modules/breadcrumb";
import AppButton from "@/components/AppButton";
import { currentUserAtom } from "@/modules/currentUser";
import { useLogoutEmployee } from "@/hooks/login";

const { Header } = Layout;

const CommonHeader = () => {
  const setBreadCrumb = useSetRecoilState(breadCrumbAtom);
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const { mutate: logout } = useLogoutEmployee();

  const navigate = useNavigate();

  const handleClickHeaderItem = ({ keyPath, key }: any) => {
    const newBreadCrumb = keyPath
      ?.map((item: string) => {
        if (item === "/") return "HOME";
        return item.replaceAll(/[\/-]/g, " ").trim().toUpperCase();
      })
      .reverse();
    setBreadCrumb(newBreadCrumb);
    navigate(key);
  };

  const handleLogout = () => {
    setCurrentUser({});
    logout("");
  };

  return (
    <Header className="common-header">
      <div className="logo">Logo</div>
      <Menu
        theme="dark"
        mode="horizontal"
        className="menu"
        items={HEADER_ITEMS}
        onClick={handleClickHeaderItem}
      />
      <AppButton buttonTitle="Logout" onClick={handleLogout} />
    </Header>
  );
};

export default CommonHeader;
