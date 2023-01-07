import { Typography } from "antd";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AppButton from "@/components/AppButton";
import AppPrimaryCard from "@/components/AppCard/Primary";
import { useDeleteTopic } from "@/hooks/test-topic";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { TopicManagementContext } from "@/pages/test-topics";

const { Text } = Typography;

const TopicCard: FC<{ topic: any }> = ({ topic }) => {
  const navigate = useNavigate();

  const { handleSetTopicUpdateId, handleToggleModal } = useContext(
    TopicManagementContext
  ) as any;

  const {
    mutate: deleteTopic,
    isError,
    isSuccess,
  } = useDeleteTopic(topic.id);

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: `Delete topic ${topic.name} successfully `,
  });

  const handleClickTopicCard = (topicId: number) => () => {
    // navigate(`${APP_PAGE_NAME_ROUTES.TEST_QUESTION}?topic=${topicId}`);
  };

  const handleClickUpdate = (e: any) => {
    e.stopPropagation();
    handleSetTopicUpdateId(topic.id);
    handleToggleModal();
  };

  return (
    <AppPrimaryCard
      title={topic.name}
      onDelete={deleteTopic}
      onClick={handleClickTopicCard(topic.id)}
    >
      <Text>{topic.description}</Text>
      <AppButton buttonTitle="Update" onClick={handleClickUpdate} />
    </AppPrimaryCard>
  );
};

export default TopicCard;
