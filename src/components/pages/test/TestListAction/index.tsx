import AppButton from "@/components/AppButton";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useDeleteJob } from "@/hooks/job";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { TestsContext } from "@/pages/tests";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";

const TestListAction: FC<{ testId: number }> = ({ testId }) => {
  const navigate = useNavigate();
  const { mutate: onDeleteTest, isError, isSuccess } = useDeleteJob(testId);
  const { toggleAssignModal, setAssignment } = useContext(TestsContext) as any;

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: `Delete test successfully`,
  });

  const handleNavigateToUpdate = () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.TEST_UPDATE(testId));
  };

  const handleDeleteTest = () => {
    onDeleteTest("");
  };

  const assignTest = () => {
    setAssignment((prev: any) => ({ ...prev, testId: testId }));
    toggleAssignModal();
  };

  return (
    <div className="job-group-btn">
      <AppButton buttonTitle="View Detail" onClick={handleNavigateToUpdate} />
      <AppButton buttonTitle="Delete" onClick={handleDeleteTest} />
      <AppButton buttonTitle="Assign Test" onClick={assignTest} />
    </div>
  );
};

export default TestListAction;
