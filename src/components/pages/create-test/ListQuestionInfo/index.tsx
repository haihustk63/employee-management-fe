import { Space, Typography } from "antd";
import { FC, useContext, useEffect } from "react";

import AppButton from "@/components/AppButton";
import AppPrimaryCard from "@/components/AppCard/Primary";
import AppTag from "@/components/AppTag";
import { QUESTION_LEVELS } from "@/constants/common";
import { createUniqueId } from "@/helpers";
import { useGetAllTestTopics } from "@/hooks/test-topic";
import { useCreateRandomTest } from "@/hooks/tests";
import { CreateTestContext } from "@/pages/tests/create-test";

const { easy, hard, medium } = QUESTION_LEVELS;

const { Text } = Typography;

const ListQuestionInfo: FC = () => {
  const {
    questionInfo = [],
    setRandomTest,
    toggleShowTestModal,
  } = useContext(CreateTestContext) as any;
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
      toggleShowTestModal();
    }
  };

  return (
    <div className="list-question-info">
      <Text className="app-title">Test Info</Text>
      <div className="list">
        {questionInfo.map((item: any, index: number) => {
          return (
            <AppPrimaryCard
              key={createUniqueId()}
              hasBoxShadow
              borderColor="blue"
              borderType="dashed"
              title={item.type}
            >
              <Space>
                <AppTag color="blue">
                  {topics.find((topic: any) => topic.id === item.topicId)?.name}
                </AppTag>
                <AppTag color="success">{item[easy.value]} Easy</AppTag>
                <AppTag color="warning">{item[medium.value]} Medium</AppTag>
                <AppTag color="error">{item[hard.value]} Hard</AppTag>
              </Space>
            </AppPrimaryCard>
          );
        })}
      </div>
      <AppButton
        buttonTitle="Create random test"
        onClick={handleCreateRandomTest}
        disabled={!questionInfo.length}
      />
    </div>
  );
};

export default ListQuestionInfo;
