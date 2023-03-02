import AppButton from "@/components/AppButton";
import { showDeleteConfirm } from "@/components/AppConfirm";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useDeleteJob } from "@/hooks/job";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { JobManagementContext } from "@/pages/jobs";
import { Space } from "antd";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";

const JobListAction: FC<{ jobId: string; jobTitle: string }> = ({
  jobId,
  jobTitle,
}) => {
  const navigate = useNavigate();
  const { setJobId } = useContext(JobManagementContext) as any;
  const { mutate: onDelete, isError, isSuccess } = useDeleteJob(jobId);

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: `Delete job ${jobTitle} successfully`,
  });

  const handleNavigateToUpdate = () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.JOB_UPDATE(jobId));
  };

  const viewJobDetail = () => {
    setJobId(jobId);
  };

  const handleDeleteJob = () => {
    showDeleteConfirm({ onDelete });
  };
  return (
    <Space>
      <AppButton buttonTitle="Detail" size="small" onClick={viewJobDetail} />
      <AppButton
        buttonTitle="Update"
        size="small"
        onClick={handleNavigateToUpdate}
      />
      <AppButton
        buttonTitle="Delete"
        size="small"
        className="-danger"
        onClick={handleDeleteJob}
      />
    </Space>
  );
};

export default JobListAction;
