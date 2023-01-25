import { FC, useContext, useEffect } from "react";
import { Space, Typography } from "antd";

import AppPrimaryCard from "@/components/AppCard/Primary";
import { createUniqueId } from "@/helpers";
import { CreateTestContext } from "@/pages/tests/create-test";
import { useGetAllTestTopics } from "@/hooks/test-topic";
import AppTag from "@/components/AppTag";
import AppButton from "@/components/AppButton";
import { useCreateTest } from "@/hooks/tests";
import { getQuestionLevel, getQuestionType } from "@/utils";

const { Text } = Typography;

const ListQuestionInfoManual: FC = () => {
  const {
    testId,
    toggleShowTestModal,
    questionInfoManual = [],
    setRandomTest,
  } = useContext(CreateTestContext) as any;
  const { mutate: createTest, data, isSuccess } = useCreateTest() as any;

  useEffect(() => {
    if (isSuccess) {
      setRandomTest(data.data);
    }
  }, [isSuccess]);

  const handleCreateTest = () => {
    createTest(questionInfoManual.map((q: any) => q.questionId));
    toggleShowTestModal();
  };

  return (
    <div className="list-question-info">
      <Text className="app-title">Test Info</Text>
      <div className="list">
        {questionInfoManual?.map((item: any, index: number) => {
          return (
            <AppPrimaryCard
              key={createUniqueId()}
              hasBoxShadow
              borderColor="blue"
              borderType="dashed"
              onDelete={() => {}}
            >
              <Space>
                <AppTag color="blue">{index + 1}</AppTag>
                <AppTag color="blue">{item.topic}</AppTag>
                <AppTag color="success">
                  {getQuestionLevel(item.level)?.label}
                </AppTag>
                <AppTag color="warning">
                  {getQuestionType(item.type)?.label}
                </AppTag>
              </Space>
              <Text className="question">{item.questionText}</Text>
            </AppPrimaryCard>
          );
        })}
      </div>
      <AppButton
        buttonTitle="Create test"
        onClick={handleCreateTest}
        disabled={!questionInfoManual?.length}
      />
    </div>
  );
};

export default ListQuestionInfoManual;
