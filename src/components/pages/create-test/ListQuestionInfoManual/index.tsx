import { FC, useContext, useEffect } from "react";
import { Space, Typography } from "antd";

import AppPrimaryCard from "@/components/AppCard/Primary";
import { createUniqueId } from "@/helpers";
import { CreateTestContext } from "@/pages/tests/create-test";
import { useGetAllTestTopics } from "@/hooks/test-topic";
import AppTag from "@/components/AppTag";
import AppButton from "@/components/AppButton";
import { useCreateTest } from "@/hooks/tests";

const { Text } = Typography;

const ListQuestionInfoManual: FC = () => {
  const { questionInfoManual = [], setRandomTest } = useContext(
    CreateTestContext
  ) as any;
  const { data: topics = [] } = useGetAllTestTopics();
  const { mutate: createTest, data, isSuccess } = useCreateTest() as any;

  useEffect(() => {
    if (isSuccess) {
      setRandomTest(data.data);
    }
  }, [isSuccess]);

  const handleCreateTest = () => {
    createTest(questionInfoManual.map((q: any) => q.questionId));
  };

  return (
    <div className="input-question-info">
      {questionInfoManual?.map((item: any, index: number) => {
        return (
          <AppPrimaryCard
            key={createUniqueId()}
            hasBoxShadow
            borderColor="success"
            onDelete={() => {}}
          >
            <Space>
              <AppTag color="blue">{item.topic}</AppTag>
              <AppTag color="success">{item.level}</AppTag>
              <AppTag color="warning">{item.type}</AppTag>
              <Text>{item.questionText}</Text>
            </Space>
          </AppPrimaryCard>
        );
      })}
      <AppButton
        buttonTitle="Create random test"
        onClick={handleCreateTest}
        disabled={!questionInfoManual?.length}
      />
    </div>
  );
};

export default ListQuestionInfoManual;
