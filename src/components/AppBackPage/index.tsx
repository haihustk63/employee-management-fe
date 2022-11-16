import React, { FC } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { IAppBackPageProps } from "./interface";

const AppBackPage: FC<IAppBackPageProps> = ({ onBack }) => {
  return (
    <div className="app-back-page" onClick={onBack}>
      <ArrowLeftOutlined />
    </div>
  );
};

export default AppBackPage;
