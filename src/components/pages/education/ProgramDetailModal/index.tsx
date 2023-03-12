import AppModal from "@/components/AppModal";
import AppRate from "@/components/AppRate";
import { useRateEducationProgram } from "@/hooks/education";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { currentUserAtom } from "@/modules/currentUser";
import { EducationProgramContext } from "@/pages/education";
import { purityContent } from "@/utils";
import { Space, Tabs, Typography } from "antd";
import { useCallback, useContext, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

const { Text } = Typography;

const ProgramDetailModal = () => {
  const {
    selectProgramId,
    allPrograms,
    showProgramDetailModal,
    toggleProgramDetailModal,
  } = useContext(EducationProgramContext) as any;
  const [activeKey, setActiveKey] = useState("content");

  const { employee: currentEmployee } = useRecoilValue(currentUserAtom);

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
    return allPrograms?.find((p: any) => p.id === selectProgramId);
  }, [allPrograms, selectProgramId]);

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
      return (
        <Space>
          <Typography.Text>Rate:</Typography.Text>
          <AppRate value={joinInfo?.rate || 0} onChange={rateProgram} />
        </Space>
      );
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
