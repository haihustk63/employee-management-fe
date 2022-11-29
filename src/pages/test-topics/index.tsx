import { Typography } from "antd";

import AppPrimaryCard from "@/components/AppCard/Primary";
import { useGetAllTestTopics } from "@/hooks/test-topic";
import AppButton from "@/components/AppButton";
import { useNavigate } from "react-router-dom";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";

const { Text, Title } = Typography;

const ListTestTopic = () => {
  const { data, isLoading, isFetching } = useGetAllTestTopics();

  const navigate = useNavigate();

  const handleClickTopicCard = (topicId: any) => () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.TEST_QUESTION_BY_TOPIC(topicId));
  };

  return (
    <div className="list-test-topic">
      <div className="title">
        <Title level={3}>Test Topics</Title>
        <AppButton buttonTitle="Add topic" size="small" />
      </div>
      <div className="list">
        {data?.map((testTopic: any, index) => {
          return (
            <AppPrimaryCard key={index} title={testTopic.name}>
              <Text>{testTopic.description}</Text>
              <AppButton
                buttonTitle="View Questions List"
                onClick={handleClickTopicCard(testTopic.id)}
              />
            </AppPrimaryCard>
          );
        })}
      </div>
    </div>
  );
};

export default ListTestTopic;
