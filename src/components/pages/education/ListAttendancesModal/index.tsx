import { useContext, useEffect, useMemo } from "react";
import { Typography } from "antd";

import AppList from "@/components/AppList";
import AppModal from "@/components/AppModal";
import {
  useGetAllEducationPrograms,
  useGetEducationProgramById,
} from "@/hooks/education";
import { EducationProgramContext } from "@/pages/education";
import { mergeName } from "@/utils";
import AppRate from "@/components/AppRate";

const { Title } = Typography;

const ListAttendancesModal = () => {
  const {
    showListAttendancesModal,
    toggleListAttendancesModal,
    selectProgramId,
  } = useContext(EducationProgramContext) as any;

  const { data: programs = [] } = useGetAllEducationPrograms();

  const program = useMemo(() => {
    return programs.find((p: any) => p.id === selectProgramId);
  }, [programs, selectProgramId]);

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
