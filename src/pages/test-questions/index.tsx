import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useGetAllTestQuestions } from "@/hooks/test-question";
import TestQuestionList from "@/components/pages/test-questions/TestQuestionList";
import Search from "@/components/pages/test-questions/Search";

export const TestQuestionConText = createContext({}) as any;

const TestQuestionManagement = () => {
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
      value={{ queryParams, isInit, setQueryParams, searchParams, setIsInit }}
    >
      <div className="list-test-topic">
        <Search />
        <TestQuestionList dataSource={data} loading={isLoading || isFetching} />
      </div>
    </TestQuestionConText.Provider>
  );
};

export default TestQuestionManagement;
