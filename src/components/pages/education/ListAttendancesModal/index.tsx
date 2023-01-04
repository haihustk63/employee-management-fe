import { useContext, useMemo } from "react";
import { Typography } from "antd";

import AppList from "@/components/AppList";
import AppModal from "@/components/AppModal";
import { useGetEducationProgramById } from "@/hooks/education";
import { EducationProgramContext } from "@/pages/education";
import { mergeName } from "@/utils";

const { Title } = Typography;

const ListAttendancesModal = () => {
  const { showModal, handleToggleModal, selectProgramId } = useContext(
    EducationProgramContext
  ) as any;

  const {
    data: program = {},
    isLoading,
    isFetching,
  } = useGetEducationProgramById(selectProgramId) as any;

  const dataItems = useMemo(() => {
    if (Object.keys(program).length > 0) {
      return program?.employees?.map(({ employee }: any) => ({
        title: mergeName(employee),
      }));
    } else {
      return [];
    }
  }, [program]);

  return (
    <AppModal open={showModal} onCancel={handleToggleModal}>
      {program?.title && <Title level={3}>{program?.title}</Title>}
      <AppList
        dataSource={dataItems as any}
        loading={isLoading || isFetching}
      />
    </AppModal>
  );
};

export default ListAttendancesModal;
