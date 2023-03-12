import { useGetAllTestQuestions } from "@/hooks/test-question";
import { FC, useContext, useEffect, useMemo } from "react";

import TestQuestionList from "@/components/pages/test-question/TestQuestionList";
import { CreateTestContext } from "@/pages/tests/create-test";
import Search from "../../test-question/Search";
import { useTableParams } from "@/hooks/useTableParams";
import { getDistinctRecords } from "@/utils";

const InputQuestionInfoManual: FC = () => {
  const {
    selectedRowKeys,
    currentTest = [],
    questionInfoManual,
    setSelectedRowKeys,
    setQuestionInfoManual,
  } = useContext(CreateTestContext) as any;

  const {
    isInit,
    queryParams,
    searchParams,
    needResetPage,
    setIsInit,
    setQueryParams,
    resetPageParams,
    onChangeTableParams,
  } = useTableParams();

  const {
    data: questions,
    isLoading,
    isFetching,
  } = useGetAllTestQuestions(queryParams);

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
      onSelect: (record: any, selected: boolean, selectedRows: any[]) => {
        const newInfo = selectedRows
          .filter((row) => row)
          .map((row: any) => ({
            questionId: row.id,
            topic: row.topicName,
            level: row.level,
            type: row.type,
            questionText: row.questionText,
          }));

        let distinctRecords = getDistinctRecords(
          [...questionInfoManual, ...newInfo],
          "questionId"
        );

        if (!selected)
          distinctRecords = distinctRecords.filter(
            ({ questionId }: any) => questionId !== record.id
          );

        setQuestionInfoManual(distinctRecords);
        setSelectedRowKeys(distinctRecords.map((row: any) => row.questionId));
      },
      hideSelectAll: true,
      selectedRowKeys: selectedRowKeys,
    }),
    [selectedRowKeys, questionInfoManual]
  );

  return (
    <div className="input-question-info">
      <Search
        isInit={isInit}
        queryParams={queryParams}
        searchParams={searchParams}
        setIsInit={setIsInit}
        setQueryParams={setQueryParams}
        resetPageParams={resetPageParams}
      />
      <TestQuestionList
        dataSource={questions}
        loading={isLoading || isFetching}
        rowSelection={rowSelection}
        allowDelete={false}
        needResetPage={needResetPage}
        onChangeTableParams={onChangeTableParams}
      />
    </div>
  );
};

export default InputQuestionInfoManual;
