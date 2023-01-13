import { useGetAllTestQuestions } from "@/hooks/test-question";
import { useGetAllTestTopics } from "@/hooks/test-topic";
import { FC, useContext, useEffect, useState } from "react";

import TestQuestionList from "@/components/pages/test-question/TestQuestionList";
import { CreateTestContext } from "@/pages/tests/create-test";

const InputQuestionInfoManual: FC = () => {
  const { setQuestionInfoManual, currentTest = [] } = useContext(
    CreateTestContext
  ) as any;
  const { data: questions, isLoading, isFetching } = useGetAllTestQuestions();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    if (Object.keys(currentTest).length > 0) {
      const initSelectedRowKeys = currentTest.testQuestionSkillTest.map(
        (question: any) => question.questionId
      );
      setSelectedRowKeys(initSelectedRowKeys);
    }
  }, [currentTest]);

  const rowSelection = {
    type: "checkbox",
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      const newInfo = selectedRows.map((row: any) => ({
        questionId: row.id,
        topic: row.topic.name,
        level: row.level,
        type: row.type,
        questionText: row.questionText,
      }));
      setQuestionInfoManual(newInfo);
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys: selectedRowKeys,
  };

  return (
    <div className="input-question-info">
      <TestQuestionList
        dataSource={questions}
        loading={isLoading || isFetching}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default InputQuestionInfoManual;
