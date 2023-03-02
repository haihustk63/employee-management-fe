import AppInfoItem from "@/components/AppInfoItem";
import AppModal from "@/components/AppModal";
import { JOB_TYPES } from "@/constants/common";
import { JobManagementContext } from "@/pages/jobs";
import { getJobTypeLabel, purityContent } from "@/utils";
import { Typography } from "antd";
import React, { useContext } from "react";

const { Text } = Typography;

const JobDetailModal = () => {
  const { showJobDetailModal, onToggleJobDetailModal, jobInfo } = useContext(
    JobManagementContext
  ) as any;

  return (
    <AppModal
      open={showJobDetailModal}
      onCancel={onToggleJobDetailModal}
      wrapClassName="job-detail-modal ql-snow"
    >
      <Text className="app-title">{jobInfo?.title}</Text>
      <AppInfoItem
        label="Job type"
        value={getJobTypeLabel(jobInfo?.typeOfJob)}
      />
      <AppInfoItem label="Job level" value={getJobTypeLabel(jobInfo?.level)} />
      <AppInfoItem label="Up to" value={`$${jobInfo?.upTo}`} />
      <AppInfoItem label="Position" value={jobInfo?.positionName} />
      <div
        className="detail content ql-editor"
        dangerouslySetInnerHTML={{
          __html: purityContent(jobInfo?.jobDetail),
        }}
      ></div>
    </AppModal>
  );
};

export default JobDetailModal;
