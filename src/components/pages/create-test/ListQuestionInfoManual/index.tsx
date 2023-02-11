import { FC, useContext, useEffect } from "react";
import { Alert, Space, Typography } from "antd";

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
    selectedRowKeys,
    toggleShowTestModal,
    questionInfoManual = [],
    setRandomTest,
    setSelectedRowKeys,
    setQuestionInfoManual,
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

  const deleteQuestion = (questionId: number) => () => {
    const newSelectedRowsKey = selectedRowKeys?.filter(
      (key: number) => key !== questionId
    );
    const newQuestionInfoManual = questionInfoManual?.filter(
      (item: any) => item.questionId !== questionId
    );
    setSelectedRowKeys(newSelectedRowsKey);
    setQuestionInfoManual(newQuestionInfoManual);
  };

  return (
    <div className="list-question-info">
      <Text className="app-title">Test Info</Text>
      {!questionInfoManual?.length && (
        <Alert
          type="warning"
          message="No question is selected"
          closable={false}
        />
      )}
      <div className="list">
        {questionInfoManual?.map((item: any, index: number) => {
          return (
            <AppPrimaryCard
              key={item.questionId}
              hasBoxShadow
              borderColor="blue"
              borderType="dashed"
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
              <AppButton
                buttonTitle="Delete"
                size="small"
                className="-danger"
                onClick={deleteQuestion(item.questionId)}
              />
            </AppPrimaryCard>
          );
        })}
      </div>
      <AppButton
        buttonTitle="Preview test"
        onClick={handleCreateTest}
        disabled={!questionInfoManual?.length}
      />
    </div>
  );
};

export default ListQuestionInfoManual;
