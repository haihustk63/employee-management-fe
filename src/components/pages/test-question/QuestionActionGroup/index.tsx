import AppButton from "@/components/AppButton";
import { showDeleteConfirm } from "@/components/AppConfirm";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useDeleteTestQuestion } from "@/hooks/test-question";
import { Space } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const QuestionActionGroup: FC<{ record: any }> = ({ record }) => {
  const navigate = useNavigate();
  const { mutate: onDelete } = useDeleteTestQuestion(record.id);

  const deleteQuestion = () => {
    showDeleteConfirm({ onDelete });
  };

  const viewQuestionDetail = (questionId: number) => () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.TEST_QUESTION_UPDATE(questionId));
  };

  return (
    <Space>
      <AppButton
        buttonTitle="View Detail"
        htmlType="button"
        size="small"
        onClick={viewQuestionDetail(record.id)}
      />
      <AppButton
        buttonTitle="Delete"
        htmlType="button"
        size="small"
        className="-danger"
        onClick={deleteQuestion}
      />
    </Space>
  );
};

export default QuestionActionGroup;
