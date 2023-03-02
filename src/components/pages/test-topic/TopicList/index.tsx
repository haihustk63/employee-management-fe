import { Typography } from "antd";
import { FC, useContext } from "react";

import AppButton from "@/components/AppButton";
import { TopicManagementContext } from "@/pages/test-topics";
import TopicCard from "./TopicCard";

const { Text } = Typography;

const TopicList: FC = () => {
  const { data = [], handleToggleModal } = useContext(
    TopicManagementContext
  ) as any;

  return (
    <div className="topic-list">
      <div className="title">
        <Text className="app-title">Skill Test Topic Management</Text>
        <AppButton
          buttonTitle="Add topic"
          size="small"
          onClick={handleToggleModal}
        />
      </div>
      <div className="list">
        {data?.map((topic: any, index: number) => {
          return <TopicCard topic={topic} key={index} />;
        })}
      </div>
    </div>
  );
};

export default TopicList;
