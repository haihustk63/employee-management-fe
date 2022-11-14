import { Steps } from "antd";
import React, { FC } from "react";

const AppStep: FC<{ step: number, items: any[] }> = ({ step, items }) => {
  return (
    <Steps
      items={items}
      current={step}
      className="app-step"
    />
  );
};

export default AppStep;
