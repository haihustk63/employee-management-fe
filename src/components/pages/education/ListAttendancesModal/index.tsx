import { Typography } from "antd";
import { useContext, useMemo } from "react";

import AppList from "@/components/AppList";
import AppModal from "@/components/AppModal";
import AppRate from "@/components/AppRate";
import { EducationProgramContext } from "@/pages/education";
import { mergeName } from "@/utils";

const { Title } = Typography;

const ListAttendancesModal = () => {
  const {
    allPrograms,
    showListAttendancesModal,
    toggleListAttendancesModal,
    selectProgramId,
  } = useContext(EducationProgramContext) as any;

  const program = useMemo(() => {
    return allPrograms?.find((p: any) => p.id === selectProgramId);
  }, [allPrograms, selectProgramId]);

  const dataItems = useMemo(() => {
    if (program) {
      if (Object.keys(program).length > 0) {
        return program?.employees?.map(({ isTutor, rate, employee }: any) => {
          let title = mergeName(employee);
          if (isTutor) {
            title += " (HOST)";
          }
          return {
            title,
            description: <AppRate value={rate || 0} disabled />,
          };
        });
      } else {
        return [];
      }
    }
  }, [program]);

  return (
    <AppModal
      open={showListAttendancesModal}
      onCancel={toggleListAttendancesModal}
    >
      {program?.title && <Title level={3}>{program?.title}</Title>}
      <AppList dataSource={dataItems as any} />
    </AppModal>
  );
};

export default ListAttendancesModal;
