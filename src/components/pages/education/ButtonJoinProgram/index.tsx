import { FC } from "react";

import AppButton from "@/components/AppButton";
import { useJoinEducationProgram } from "@/hooks/education";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

const ButtonJoinProgram: FC<{ programId: number }> = ({ programId = "" }) => {
  const { mutate: onJoin, isError, isSuccess } = useJoinEducationProgram();
  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "Join program successfully",
  });

  const handleClickDelete = (e: any) => {
    e.stopPropagation();
    onJoin({ programId });
  };

  return <AppButton buttonTitle="Join" onClick={handleClickDelete} />;
};

export default ButtonJoinProgram;
