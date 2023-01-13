import React from "react";
import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { HEADER_CANDIDATE_ITEMS } from "@/constants/common";
import { useSetRecoilState } from "recoil";
import { currentUserAtom } from "@/modules/currentUser";
import AppButton from "@/components/AppButton";
import { useLogoutEmployee } from "@/hooks/login";

const { Header } = Layout;

const CandidateLayoutHeader = () => {
  const navigate = useNavigate();
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const { mutate: logout } = useLogoutEmployee();

  const handleClickHeaderItem = ({ keyPath, key }: any) => {
    navigate(key);
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser({});
    logout("");
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
      <AppButton buttonTitle="Logout" onClick={handleLogout} />
    </Header>
  );
};

export default CandidateLayoutHeader;
