import { FC } from "react";

import AppButton from "@/components/AppButton";
import { useDeleteEducationProgram } from "@/hooks/education";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

const ButtonDeleteProgram: FC<{ programId: number }> = ({ programId = "" }) => {
  const { mutate, isError, isSuccess } = useDeleteEducationProgram(programId);
  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "Delete program successfully",
  });

  const handleClickDelete = (e: any) => {
    mutate("");
  };

  return <AppButton buttonTitle="Delete" onClick={handleClickDelete} />;
};

export default ButtonDeleteProgram;
