import { createContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useGetAllTestQuestions } from "@/hooks/test-question";
import TestQuestionList from "@/components/pages/test-question/TestQuestionList";
import Search from "@/components/pages/test-question/Search";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { Typography } from "antd";

const { Text } = Typography;

export const TestQuestionConText = createContext({}) as any;

const TestQuestionManagement = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState();
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    if (isInit) {
      setSearchParams(queryParams as any);
    }
  }, [queryParams, isInit]);

  const { data, isLoading, isFetching } = useGetAllTestQuestions(queryParams);

  return (
    <TestQuestionConText.Provider
      value={{
        queryParams,
        isInit,
        searchParams,
        setQueryParams,
        setIsInit,
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
