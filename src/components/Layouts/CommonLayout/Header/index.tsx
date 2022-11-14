import React from "react";
import { Layout, Menu } from "antd";
import { HEADER_ITEMS } from "@/constants/common";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { breadCrumbAtom } from "@/modules/breadcrumb";

const { Header } = Layout;

const CommonHeader = () => {
  const setBreadCrumb = useSetRecoilState(breadCrumbAtom);

  const navigate = useNavigate();

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
    <Header className="common-header">
      <div className="logo">Logo</div>
      <Menu
        theme="dark"
        mode="horizontal"
        className="menu"
        items={HEADER_ITEMS}
        onClick={handleClickSiderItem}
      />
    </Header>
  );
};

export default CommonHeader;
