import AppButton from "@/components/AppButton";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useDeleteJob } from "@/hooks/job";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const JobListAction: FC<{ jobId: string; jobTitle: string }> = ({
  jobId,
  jobTitle,
}) => {
  const navigate = useNavigate();
  const { mutate: onDeleteJob, isError, isSuccess } = useDeleteJob(jobId);

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: `Delete job ${jobTitle} successfully`,
  });

  const handleNavigateToUpdate = () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.JOB_UPDATE(jobId));
  };

  const handleDeleteJob = () => {
    onDeleteJob("");
  };
  return (
    <div className="job-group-btn">
      <AppButton buttonTitle="View Detail" onClick={handleNavigateToUpdate} />
      <AppButton buttonTitle="Delete" onClick={handleDeleteJob} />
    </div>
  );
};

export default JobListAction;