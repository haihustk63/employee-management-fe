import { useCallback, useContext, useMemo, useState } from "react";
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
import { Tabs, Typography } from "antd";

const { Text } = Typography;

const ProgramDetailModal = () => {
  const { showProgramDetailModal, toggleProgramDetailModal, selectProgramId } =
    useContext(EducationProgramContext) as any;
  const [activeKey, setActiveKey] = useState("content");

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

  const tabItems = useMemo(
    () => [
      {
        key: "content",
        label: "Content",
        children: (
          <div
            className="content ql-editor"
            dangerouslySetInnerHTML={{
              __html: purityContent(program?.content),
            }}
          ></div>
        ),
      },
      {
        key: "materials",
        label: "Materials",
        children: (
          <ul className="materials">
            {program?.materials?.map((item: string) => (
              <li key={item}>
                <a href={item} target="_blank">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        ),
      },
    ],
    [program]
  );

  const onCancel = () => {
    setActiveKey("content");
    toggleProgramDetailModal();
  };

  const onChangeTab = (key: string) => {
    setActiveKey(key);
  };

  return (
    <AppModal
      open={showProgramDetailModal}
      onCancel={onCancel}
      wrapClassName="program-detail-modal ql-snow"
      footer={footer}
    >
      <p className="title">{program?.title}</p>
      <Tabs
        items={tabItems as any}
        defaultActiveKey="content"
        activeKey={activeKey}
        onChange={onChangeTab}
      />
    </AppModal>
  );
};

export default ProgramDetailModal;
