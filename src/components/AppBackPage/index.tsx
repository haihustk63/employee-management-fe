import React, { FC } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { IAppBackPageProps } from "./interface";
import AppModal from "../AppModal";
import useModal from "@/hooks/useModal";

const AppBackPage: FC<IAppBackPageProps> = ({ onBack }) => {
  const { showModal, handleToggleModal } = useModal();

  return (
    <div className="app-back-page" onClick={handleToggleModal}>
      <ArrowLeftOutlined />
      <AppModal open={showModal} onCancel={handleToggleModal} onOk={onBack}>
        Are you sure to go back?
      </AppModal>
    </div>
  );
};

export default AppBackPage;
