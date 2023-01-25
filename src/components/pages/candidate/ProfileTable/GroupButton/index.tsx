import { useContext } from "react";

import AppButton from "@/components/AppButton";
import { useDeleteCandidateProfile } from "@/hooks/candidate";
import { CandidateProfileContext } from "@/pages/candidate";
import { Space } from "antd";

const GroupButton = ({ record }: any) => {
  const { handleSetCandidateId } = useContext(CandidateProfileContext) as any;
  const { mutate: onDeleteCandidate } = useDeleteCandidateProfile(record.id);

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
        onClick={onDeleteCandidate}
      />
    </Space>
  );
};

export default GroupButton;
