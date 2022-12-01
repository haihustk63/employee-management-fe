import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

import AppPrimaryCard from "@/components/AppCard/Primary";
import AppButton from "@/components/AppButton";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useGetAllTestQuestions } from "@/hooks/test-question";
import TestQuestionList from "@/components/pages/test-questions/TestQuestionList";

const { Text, Title } = Typography;

const TestQuestionManagement = () => {
  const { data, isLoading, isFetching } = useGetAllTestQuestions();

  return (
    <div className="list-test-topic">
      <TestQuestionList dataSource={data} loading={isLoading || isFetching} />
    </div>
  );
};

export default TestQuestionManagement;
