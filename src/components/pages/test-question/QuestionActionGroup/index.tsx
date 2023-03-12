import AppButton from "@/components/AppButton";
import { showDeleteConfirm } from "@/components/AppConfirm";
import AppModal from "@/components/AppModal";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useDeleteTestQuestion } from "@/hooks/test-question";
import useModal from "@/hooks/useModal";
import { Space } from "antd";
import { FC } from "react";
import ShowQuestion from "../../create-test/ShowTest/ShowQuestion";

const QuestionActionGroup: FC<{ record: any; allowDelete?: boolean }> = ({
  record,
  allowDelete,
}) => {
  const { mutate: onDelete } = useDeleteTestQuestion(record.id);
  const { showModal, handleToggleModal } = useModal();

  const deleteQuestion = () => {
    showDeleteConfirm({ onDelete });
  };

  const viewQuestionDetail = () => {
    handleToggleModal();
  };

  const ModalFooter = (
    <a
      href={DYNAMIC_APP_PAGE_ROUTES.TEST_QUESTION_UPDATE(record.id)}
      target="_blank"
    >
      <AppButton buttonTitle="Update" />
    </a>
  );

  return (
    <>
      <Space>
        <AppButton
          buttonTitle="Detail"
          htmlType="button"
          size="small"
          onClick={viewQuestionDetail}
        />
        {allowDelete && (
          <AppButton
            buttonTitle="Delete"
            htmlType="button"
            size="small"
            className="-danger"
            onClick={deleteQuestion}
          />
        )}
      </Space>

      <AppModal
        open={showModal}
        title="Question detail"
        onCancel={handleToggleModal}
        footer={ModalFooter}
        wrapClassName="modal-question-detail"
      >
        <ShowQuestion question={record} answer={record.answer} disableInput />
      </AppModal>
    </>
  );
};

export default QuestionActionGroup;
