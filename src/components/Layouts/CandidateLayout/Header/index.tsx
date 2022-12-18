import React from "react";
import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { HEADER_CANDIDATE_ITEMS } from "@/constants/common";

const { Header } = Layout;

const CandidateLayoutHeader = () => {
  const navigate = useNavigate();
  const handleClickHeaderItem = ({ keyPath, key }: any) => {
    navigate(key);
  };
  return (
    <Header className="candidate-layout-header">
      <div className="logo">Logo</div>
      <Menu
        theme="dark"
        mode="horizontal"
        className="menu"
        onClick={handleClickHeaderItem}
        items={HEADER_CANDIDATE_ITEMS(0)}
      />
    </Header>
  );
};

export default CandidateLayoutHeader;
