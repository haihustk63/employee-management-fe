import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

import AppWithCoverCard from "@/components/AppCard/WithCover";
import AppTag from "@/components/AppTag";
import ButtonDeleteProgram from "@/components/pages/education/ButtonDeleteProgram";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useGetAllEducationPrograms } from "@/hooks/education";
import { mergeName } from "@/utils";
import ButtonJoinProgram from "@/components/pages/education/ButtonJoinProgram";
import AppButton from "@/components/AppButton";
import useModal from "@/hooks/useModal";
import ListAttendancesModal from "@/components/pages/education/ListAttendancesModal";
import { createContext, useState } from "react";

const { Title } = Typography;

export const EducationProgramContext = createContext({});

const EducationProgramManagement = () => {
  const navigate = useNavigate();

  const { showModal, handleToggleModal } = useModal();
  const [selectProgramId, setSelectProgramId] = useState();

  const { data: programs = [] } = useGetAllEducationPrograms();

  const handleClickCard = (programId: number) => () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.EDUCATION_PROGRAM_UPDATE(programId));
  };

  const handleSetSelectProgramId = (programId: any) => (e: any) => {
    e.stopPropagation();
    setSelectProgramId(programId);
    handleToggleModal();
  };

  return (
    <EducationProgramContext.Provider
      value={{ showModal, selectProgramId, handleToggleModal }}
    >
      <div className="education-program-management">
        <Title level={3}>Education Program</Title>
        <div className="list">
          {programs.map((item: any) => {
            return (
              <AppWithCoverCard
                key={item.id}
                title={item.title}
                imageUrl="https://demos.themeselection.com/sneat-bootstrap-html-admin-template-free/assets/img/elements/18.jpg"
                onClick={handleClickCard(item.id)}
                hasBoxShadow
              >
                <AppTag color="success">
                  {item.tutor ? mergeName(item.tutor) : "WIP "}
                </AppTag>
                <AppTag color="success">{item.averageRate}</AppTag>
                <ButtonDeleteProgram programId={item.id} />
                <ButtonJoinProgram programId={item.id} />
                <AppButton
                  buttonTitle="Show attendances"
                  onClick={handleSetSelectProgramId(item.id)}
                />
              </AppWithCoverCard>
            );
          })}
        </div>
        <ListAttendancesModal />
      </div>
    </EducationProgramContext.Provider>
  );
};

export default EducationProgramManagement;
