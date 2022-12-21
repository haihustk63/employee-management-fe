import { useGetAllTestQuestions } from "@/hooks/test-question";
import { useGetAllTestTopics } from "@/hooks/test-topic";
import { FC, useContext } from "react";

import TestQuestionList from "@/components/pages/test-question/TestQuestionList";
import { CreateTestContext } from "@/pages/create-test";

const InputQuestionInfoManual: FC = () => {
  const { setQuestionInfoManual } = useContext(CreateTestContext) as any;
  const { data: questions, isLoading, isFetching } = useGetAllTestQuestions();
  const { data: topics } = useGetAllTestTopics();

  const rowSelection = {
    type: "checkbox",
    onChange: (_selectedRowKeys: React.Key[], selectedRows: any[]) => {
      const newInfo = selectedRows.map((row: any) => ({
        questionId: row.id,
        topic: row.topic.name,
        level: row.level,
        type: row.type,
        questionText: row.questionText,
      }));
      setQuestionInfoManual(newInfo);
    },
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
