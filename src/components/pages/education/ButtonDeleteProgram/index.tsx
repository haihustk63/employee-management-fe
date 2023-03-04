import { FC } from "react";

import AppButton from "@/components/AppButton";
import { showDeleteConfirm } from "@/components/AppConfirm";
import { useDeleteEducationProgram } from "@/hooks/education";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

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

  return (
    <AppButton
      buttonTitle="Delete"
      className="-danger"
      onClick={handleClickDelete}
    />
  );
};

export default ButtonDeleteProgram;
