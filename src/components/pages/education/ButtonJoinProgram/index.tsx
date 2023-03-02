import { FC, useCallback, useMemo } from "react";

import AppButton from "@/components/AppButton";
import {
  useJoinEducationProgram,
  useUnJoinEducationProgram,
} from "@/hooks/education";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "@/modules/currentUser";
import { dayjs } from "@/dayjs-config";

const ButtonJoinProgram: FC<{ program: any }> = ({ program }) => {
  const { employee } = useRecoilValue(currentUserAtom);
  const {
    mutate: onJoin,
    error: joinError,
    isError,
    isSuccess,
  } = useJoinEducationProgram();
  const {
    mutate: onUnJoin,
    isError: unjoinError,
    isSuccess: unjoinSuccess,
  } = useUnJoinEducationProgram();

  useTriggerNoti({
    error: joinError,
    isError,
    isSuccess,
    messageSuccess: "Join program successfully",
  });

  useTriggerNoti({
    isError: unjoinError,
    isSuccess: unjoinSuccess,
    messageSuccess: "Unjoin program successfully",
  });

  const joiningInfo = useMemo(() => {
    const employeeId = employee.id;
    return program.employees.find(
      (item: any) => item.employee.id === employeeId
    );
  }, [employee, program]);

  const buttonTitle = useMemo(() => {
    if (joiningInfo) {
      return "Unjoin";
    } else {
      return "Join";
    }
  }, [joiningInfo]);

  const disabled = useMemo(() => {
    if (dayjs(program.time).isBefore(Date.now())) {
      return true;
    }
  }, [joiningInfo, program]);

  const handleClickToggleJoin = useCallback(() => {
    if (joiningInfo) {
      onUnJoin({ programId: program?.id });
    } else {
      onJoin({ programId: program?.id });
    }
  }, [joiningInfo, program]);

  return (
    <AppButton
      buttonTitle={buttonTitle}
      onClick={handleClickToggleJoin}
      disabled={disabled}
    />
  );
};

export default ButtonJoinProgram;
