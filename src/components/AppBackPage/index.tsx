import { ArrowLeftOutlined } from "@ant-design/icons";
import { FC } from "react";

import useModal from "@/hooks/useModal";
import AppModal from "../AppModal";
import { IAppBackPageProps } from "./interface";

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
