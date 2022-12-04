import { useGetAllTestQuestions } from "@/hooks/test-question";
import TestQuestionList from "@/components/pages/test-questions/TestQuestionList";
import Search from "@/components/pages/test-questions/Search";
import { createContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const TestQuestionConText = createContext({}) as any;

const TestQuestionManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    return {
      keyword: searchParams.get("keyword"),
      topic: searchParams.get("topic"),
      level: searchParams.get("level"),
      type: searchParams.get("type"),
    };
  }, [searchParams]); 
  
  const { data, isLoading, isFetching } = useGetAllTestQuestions({
    params,
  });
  
  return (
    <TestQuestionConText.Provider
      value={{ params, setSearchParams, searchParams }}
    >
      <div className="list-test-topic">
        <Search />
        <TestQuestionList dataSource={data} loading={isLoading || isFetching} />
      </div>
    </TestQuestionConText.Provider>
  );
};

export default TestQuestionManagement;
