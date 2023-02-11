import { useGetAllTestQuestions } from "@/hooks/test-question";
import { FC, useContext, useEffect, useMemo, useState } from "react";

import TestQuestionList from "@/components/pages/test-question/TestQuestionList";
import { CreateTestContext } from "@/pages/tests/create-test";

const InputQuestionInfoManual: FC = () => {
  const {
    selectedRowKeys,
    currentTest = [],
    setSelectedRowKeys,
    setQuestionInfoManual,
  } = useContext(CreateTestContext) as any;
  const { data: questions, isLoading, isFetching } = useGetAllTestQuestions();

  useEffect(() => {
    if (Object.keys(currentTest).length > 0) {
      const initSelectedRowKeys = currentTest.testQuestionSkillTest.map(
        (question: any) => question.questionId
      );
      setSelectedRowKeys(initSelectedRowKeys);
    }
  }, [currentTest]);

  const rowSelection = useMemo(
    () => ({
      type: "checkbox",
      onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
        const newInfo = selectedRows.map((row: any) => ({
          questionId: row.id,
          topic: row.topicName,
          level: row.level,
          type: row.type,
          questionText: row.questionText,
        }));
        setQuestionInfoManual(newInfo);
        setSelectedRowKeys(selectedRowKeys);
      },
      selectedRowKeys: selectedRowKeys,
    }),
    [selectedRowKeys]
  );

  return (
    <div className="input-question-info">
      <TestQuestionList
        dataSource={questions}
        loading={isLoading || isFetching}
        rowSelection={rowSelection}
        allowDelete={false}
      />
    </div>
  );
};

export default InputQuestionInfoManual;
