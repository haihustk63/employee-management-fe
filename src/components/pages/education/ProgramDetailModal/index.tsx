import { useCallback, useContext, useMemo } from "react";
import AppModal from "@/components/AppModal";
import {
  useGetAllEducationPrograms,
  useRateEducationProgram,
} from "@/hooks/education";
import { EducationProgramContext } from "@/pages/education";
import { purityContent } from "@/utils";
import AppRate from "@/components/AppRate";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "@/modules/currentUser";

const ProgramDetailModal = () => {
  const { showProgramDetailModal, toggleProgramDetailModal, selectProgramId } =
    useContext(EducationProgramContext) as any;

  const { employee: currentEmployee } = useRecoilValue(currentUserAtom);

  const { data: programs = [] } = useGetAllEducationPrograms();
  const {
    mutate: onRate,
    isError,
    isSuccess,
    error,
  } = useRateEducationProgram();

  useTriggerNoti({
    error,
    isError,
    isSuccess,
    messageSuccess: "You have rated this program successfully",
  });

  const program = useMemo(() => {
    return programs.find((p: any) => p.id === selectProgramId);
  }, [programs, selectProgramId]);

  const joinInfo = useMemo(() => {
    if (program) {
      const { employees } = program;
      return employees.find(
        ({ employee }: any) => employee.id === currentEmployee.id
      );
    }
  }, [program, currentEmployee]);

  const rateProgram = useCallback(
    (rate: number) => {
      onRate({ programId: program.id, rate });
    },
    [program]
  );

  const footer = useMemo(() => {
    if (program && joinInfo) {
      return <AppRate value={joinInfo?.rate || 0} onChange={rateProgram} />;
    }
  }, [program, rateProgram, joinInfo]);

  return (
    <AppModal
      open={showProgramDetailModal}
      onCancel={toggleProgramDetailModal}
      wrapClassName="program-detail-modal ql-snow"
      footer={footer}
    >
      <p className="title">{program?.title}</p>
      <div
        className="content ql-editor"
        dangerouslySetInnerHTML={{ __html: purityContent(program?.content) }}
      ></div>
    </AppModal>
  );
};

export default ProgramDetailModal;
