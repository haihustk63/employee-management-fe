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
      <div className="logo">
        <img
          src="https://www.logodesign.net/logo/abstract-hr-person-inside-location-pin-742ld.png?nwm=1&nws=1&industry=employment-hr&sf="
          alt="Logo"
          className="image"
        />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        className="menu"
        onClick={handleClickHeaderItem}
        items={HEADER_CANDIDATE_ITEMS}
      />
      <AppButton buttonTitle="Logout" onClick={handleLogout} />
    </Header>
  );
};

export default CandidateLayoutHeader;
