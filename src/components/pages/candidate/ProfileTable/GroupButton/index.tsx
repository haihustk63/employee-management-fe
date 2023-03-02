import { useContext } from "react";

import AppButton from "@/components/AppButton";
import { useDeleteCandidateProfile } from "@/hooks/candidate";
import { CandidateProfileContext } from "@/pages/candidate";
import { Space } from "antd";
import { showDeleteConfirm } from "@/components/AppConfirm";

const GroupButton = ({ record }: any) => {
  const { handleSetCandidateId } = useContext(CandidateProfileContext) as any;
  const { mutate: onDelete } = useDeleteCandidateProfile(record.id);

  const deleteCandidate = () => {
    showDeleteConfirm({
      onDelete,
    });
  };

  return (
    <Space>
      <AppButton
        buttonTitle="Update"
        size="small"
        onClick={handleSetCandidateId(record.id)}
      />
      <AppButton
        buttonTitle="Delete"
        size="small"
        className="-danger"
        onClick={deleteCandidate}
      />
    </Space>
  );
};

export default GroupButton;
