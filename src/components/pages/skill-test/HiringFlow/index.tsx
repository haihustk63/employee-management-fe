import { StepProps, Steps, Typography } from "antd";

import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

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
      <Text className="title">Our hiring process</Text>
      <Steps items={items} direction="vertical" className="steps" />
    </div>
  );
};

export default HiringFlow;
