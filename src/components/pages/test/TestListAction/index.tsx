import AppButton from "@/components/AppButton";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useDeleteJob } from "@/hooks/job";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const TestListAction: FC<{ record: any }> = ({ record }) => {
  const navigate = useNavigate();
  const {
    mutate: onDeleteTest,
    isError,
    isSuccess,
  } = useDeleteJob(record.testId);

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: `Delete test successfully`,
  });

  const handleNavigateToUpdate = () => {
    console.log(record);
    navigate(DYNAMIC_APP_PAGE_ROUTES.TEST_UPDATE(record.id));
  };

  const handleDeleteTest = () => {
    onDeleteTest("");
  };
  return (
    <div className="job-group-btn">
      <AppButton buttonTitle="View Detail" onClick={handleNavigateToUpdate} />
      <AppButton
        buttonTitle="Delete"
        onClick={handleDeleteTest}
        disabled={record.isSubmitted}
      />
    </div>
  );
};

export default TestListAction;
