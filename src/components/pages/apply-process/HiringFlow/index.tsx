import React from "react";
import { StepProps, Steps } from "antd";

import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

const items: StepProps[] = [
  {
    title: "Apply CV",
    status: "finish",
    icon: <UserOutlined />,
  },
  {
    title: "Attempt the skill test",
    status: "finish",
    icon: <SolutionOutlined />,
  },
  {
    title: "Interview",
    status: "wait",
    icon: <LoadingOutlined />,
  },
  {
    title: "Result",
    status: "wait",
    icon: <SmileOutlined />,
  },
];

const HiringFlow = () => {
  return (
    <div className="hiring-flow">
      <Steps items={items} />
    </div>
  );
};

export default HiringFlow;
