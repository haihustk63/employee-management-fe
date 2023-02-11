import { Typography } from "antd";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AppButton from "@/components/AppButton";
import AppPrimaryCard from "@/components/AppCard/Primary";
import { useDeleteTopic } from "@/hooks/test-topic";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { TopicManagementContext } from "@/pages/test-topics";
import { showDeleteConfirm } from "@/components/AppConfirm";
import AppTooltip from "@/components/AppTooltip";

const { Text } = Typography;

const TopicCard: FC<{ topic: any }> = ({ topic }) => {
  const navigate = useNavigate();

  const { handleSetTopicUpdateId, handleToggleModal } = useContext(
    TopicManagementContext
  ) as any;

  const { mutate: deleteTopic, isError, isSuccess } = useDeleteTopic(topic.id);

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: `Delete topic ${topic.name} successfully `,
  });

  const handleClickTopicCard = (topicId: number) => () => {
    // navigate(`${APP_PAGE_NAME_ROUTES.TEST_QUESTION}?topic=${topicId}`);
  };

  const handleClickUpdate = (e: any) => {
    handleSetTopicUpdateId(topic.id);
    handleToggleModal();
  };

  const handleDelete = () => {
    showDeleteConfirm({ onDelete: deleteTopic });
  };

  return (
    <AppPrimaryCard title={topic.name} className="topic-card">
      <AppTooltip title={topic.description} placement="leftBottom">
        <Text className="description">{topic.description}</Text>
      </AppTooltip>
      <div className="actions">
        <AppButton buttonTitle="Update" onClick={handleClickUpdate} />
        <AppButton
          buttonTitle="View questions"
          onClick={handleClickTopicCard(topic.id)}
        />
        <AppButton
          buttonTitle="Delete"
          onClick={handleDelete}
          className="-danger"
        />
      </div>
    </AppPrimaryCard>
  );
};

export default TopicCard;
