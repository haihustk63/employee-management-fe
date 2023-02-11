import { createContext } from "react";

import Search from "@/components/pages/test-question/Search";
import TestQuestionList from "@/components/pages/test-question/TestQuestionList";
import { useGetAllTestQuestions } from "@/hooks/test-question";
import { useTableParams } from "@/hooks/useTableParams";
import { Typography } from "antd";

const { Text } = Typography;

export const TestQuestionConText = createContext({}) as any;

const TestQuestionManagement = () => {
  const {
    isInit,
    needResetPage,
    queryParams,
    searchParams,
    onChangeTableParams,
    resetPageParams,
    setIsInit,
    setQueryParams,
  } = useTableParams();

  const {
    data = {},
    isLoading,
    isFetching,
  } = useGetAllTestQuestions(queryParams);

  return (
    <TestQuestionConText.Provider
      value={{
        queryParams,
        isInit,
        searchParams,
        needResetPage,
        setQueryParams,
        setIsInit,
        onChangeTableParams,
        resetPageParams,
      }}
    >
      <div className="test-question-management">
        <Text className="app-title">Test Questions</Text>
        <Search />
        <TestQuestionList dataSource={data} loading={isLoading || isFetching} />
      </div>
    </TestQuestionConText.Provider>
  );
};

export default TestQuestionManagement;
