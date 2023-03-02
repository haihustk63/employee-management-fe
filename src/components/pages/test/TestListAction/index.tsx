import AppButton from "@/components/AppButton";
import { showDeleteConfirm } from "@/components/AppConfirm";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useDeleteJob } from "@/hooks/job";
import { useDeleteTest } from "@/hooks/tests";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { TestsContext } from "@/pages/tests";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";

const TestListAction: FC<{ testId: number }> = ({ testId }) => {
  const navigate = useNavigate();
  const { mutate: onDeleteTest, isError, isSuccess } = useDeleteTest(testId);
  const {
    isAdmin,
    toggleAssignModal,
    setAssignment,
    showContestants,
    setTestId,
  } = useContext(TestsContext) as any;

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: `Delete test successfully`,
  });

  const changeTestId = () => {
    setTestId(testId);
  };

  const navigateToUpdate = () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.TEST_UPDATE(testId));
  };

  const handleDeleteTest = () => {
    showDeleteConfirm({ onDelete: onDeleteTest });
  };

  const assignTest = () => {
    setAssignment((prev: any) => ({ ...prev, testId: testId }));
    toggleAssignModal();
  };

  return (
    <div className="actions">
      <AppButton buttonTitle="Detail" onClick={changeTestId} />
      <AppButton buttonTitle="Update" onClick={navigateToUpdate} />
      <AppButton
        buttonTitle="View Contestants"
        onClick={showContestants(testId)}
      />
      {isAdmin && <AppButton buttonTitle="Assign Test" onClick={assignTest} />}
      <AppButton
        buttonTitle="Delete"
        className="-danger"
        onClick={handleDeleteTest}
      />
    </div>
  );
};

export default TestListAction;
