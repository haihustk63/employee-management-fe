import { FC, useContext, useEffect } from "react";
import { Space, Typography } from "antd";

import AppPrimaryCard from "@/components/AppCard/Primary";
import { createUniqueId } from "@/helpers";
import { CreateTestContext } from "@/pages/create-test";
import { useGetAllTestTopics } from "@/hooks/test-topic";
import AppTag from "@/components/AppTag";
import AppButton from "@/components/AppButton";
import { useCreateRandomTest } from "@/hooks/tests";

const { Text } = Typography;

const ListQuestionInfo: FC = () => {
  const { questionInfo = [], setRandomTest } = useContext(
    CreateTestContext
  ) as any;
  const { data: topics = [] } = useGetAllTestTopics();
  const {
    mutate: createRandomTest,
    data,
    isSuccess,
  } = useCreateRandomTest() as any;

  useEffect(() => {
    if (isSuccess) {
      setRandomTest(data.data);
    }
  }, [isSuccess]);

  const handleCreateRandomTest = () => {
    if (createRandomTest) {
      createRandomTest(questionInfo);
    }
  };

  return (
    <div className="input-question-info">
      {questionInfo.map((item: any, index: number) => {
        return (
          <AppPrimaryCard
            key={createUniqueId()}
            hasBoxShadow
            borderColor="success"
            title={item.type}
            onDelete={() => {}}
          >
            <Space>
              <AppTag color="blue">
                {topics.find((topic: any) => topic.id === item.topicId)?.name}
              </AppTag>
              <AppTag color="success">{item.EASY} Easy</AppTag>
              <AppTag color="warning">{item.MEDIUM} Medium</AppTag>
              <AppTag color="error">{item.HARD} Hard</AppTag>
            </Space>
          </AppPrimaryCard>
        );
      })}
      <AppButton
        buttonTitle="Create random test"
        onClick={handleCreateRandomTest}
        disabled={!questionInfo.length}
      />
    </div>
  );
};

export default ListQuestionInfo;
