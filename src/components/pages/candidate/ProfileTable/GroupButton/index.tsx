import React, { useContext } from "react";

import AppButton from "@/components/AppButton";
import { CandidateProfileContext } from "@/pages/candidate";
import { useDeleteCandidateProfile } from "@/hooks/candidate";

const GroupButton = ({ record }: any) => {
  const { handleSetCandidateId } = useContext(CandidateProfileContext) as any;
  const { mutate: onDeleteCandidate } = useDeleteCandidateProfile(record.id);

  return (
    <div className="">
      <AppButton
        buttonTitle="Update"
        onClick={handleSetCandidateId(record.id)}
      />
      <AppButton buttonTitle="Delete" onClick={onDeleteCandidate} />
    </div>
  );
};

export default GroupButton;
