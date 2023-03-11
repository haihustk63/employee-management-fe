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
        <Text className="app-title">Skill Test Question Management</Text>
        <Search
          isInit={isInit}
          queryParams={queryParams}
          searchParams={searchParams}
          setIsInit={setIsInit}
          setQueryParams={setQueryParams}
          resetPageParams={resetPageParams}
        />
        <TestQuestionList
          dataSource={data}
          loading={isLoading || isFetching}
          needResetPage={needResetPage}
          onChangeTableParams={onChangeTableParams}
        />
      </div>
    </TestQuestionConText.Provider>
  );
};

export default TestQuestionManagement;
