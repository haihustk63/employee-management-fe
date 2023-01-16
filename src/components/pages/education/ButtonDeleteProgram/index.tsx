import { FC } from "react";

import AppButton from "@/components/AppButton";
import { useDeleteEducationProgram } from "@/hooks/education";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { showDeleteConfirm } from "@/components/AppConfirm";

const ButtonDeleteProgram: FC<{ programId: number }> = ({ programId = "" }) => {
  const {
    mutate: onDelete,
    isError,
    isSuccess,
  } = useDeleteEducationProgram(programId);

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "Delete program successfully",
  });

  const handleClickDelete = () => {
    showDeleteConfirm({ onDelete });
  };

  return <AppButton buttonTitle="Delete" onClick={handleClickDelete} />;
};

export default ButtonDeleteProgram;
