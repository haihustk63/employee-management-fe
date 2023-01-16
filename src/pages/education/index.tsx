import { Space, Switch, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import AppButton from "@/components/AppButton";
import AppWithCoverCard from "@/components/AppCard/WithCover";
import AppTag from "@/components/AppTag";
import ButtonDeleteProgram from "@/components/pages/education/ButtonDeleteProgram";
import ButtonJoinProgram from "@/components/pages/education/ButtonJoinProgram";
import ListAttendancesModal from "@/components/pages/education/ListAttendancesModal";
import ProgramDetailModal from "@/components/pages/education/ProgramDetailModal";
import { APP_ROLES } from "@/constants/common";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { dayjs } from "@/dayjs-config";
import {
  useGetAllEducationPrograms,
  useGetMyEducationPrograms,
} from "@/hooks/education";
import useModal from "@/hooks/useModal";
import { currentUserAtom } from "@/modules/currentUser";
import { mergeName } from "@/utils";
import { createContext, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import AppRate from "@/components/AppRate";

const { Title, Text } = Typography;

export const EducationProgramContext = createContext({});

const EducationProgramManagement = () => {
  const navigate = useNavigate();
  const { employee } = useRecoilValue(currentUserAtom);

  const {
    showModal: showListAttendancesModal,
    handleToggleModal: toggleListAttendancesModal,
  } = useModal();
  const {
    showModal: showProgramDetailModal,
    handleToggleModal: toggleProgramDetailModal,
  } = useModal();

  const [selectProgramId, setSelectProgramId] = useState();
  const [isShowMyProgram, setIsShowMyProgram] = useState(false);

  const { data: allPrograms = [] } = useGetAllEducationPrograms();
  const { data: myPrograms = [] } = useGetMyEducationPrograms();

  const programs = useMemo(() => {
    if (isShowMyProgram) {
      return myPrograms;
    }
    return allPrograms;
  }, [isShowMyProgram, myPrograms, allPrograms]);

  const navigateUpdateProgram = (programId: number) => () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.EDUCATION_PROGRAM_UPDATE(programId));
  };

  const showProgramDetail = (programId: any) => () => {
    setSelectProgramId(programId);
    toggleProgramDetailModal();
  };

  const showAttendances = (programId: any) => () => {
    setSelectProgramId(programId);
    toggleListAttendancesModal();
  };

  const toggleSwitch = () => {
    setIsShowMyProgram(!isShowMyProgram);
  };

  return (
    <EducationProgramContext.Provider
      value={{
        showListAttendancesModal,
        showProgramDetailModal,
        selectProgramId,
        toggleListAttendancesModal,
        toggleProgramDetailModal,
      }}
    >
      <div className="education-program-management">
        <Title level={3}>Education Program</Title>
        <Text>Click to each card to view detail</Text>
        <Switch checked={isShowMyProgram} onChange={toggleSwitch} />
        <div className="list">
          {programs.map((item: any) => {
            return (
              <AppWithCoverCard
                key={item.id}
                title={item.title}
                imageUrl="https://demos.themeselection.com/sneat-bootstrap-html-admin-template-free/assets/img/elements/18.jpg"
                hasBoxShadow
                horizontal
              >
                <Space>
                  <AppTag color="success">
                    {item.tutor ? mergeName(item.tutor) : "WIP"}
                  </AppTag>
                  <AppTag color="success">
                    {dayjs(item.time).format("DD-MM-YYYY HH:mm")}
                  </AppTag>
                  <AppTag color="success">
                    {dayjs(item.endTime).format("DD-MM-YYYY HH:mm")}
                  </AppTag>
                  <AppRate value={item.averageRate} disabled />
                </Space>
                {(employee?.role === APP_ROLES.ADMIN.value ||
                  employee?.role === APP_ROLES.SUPER_ADMIN.value) && (
                  <>
                    <ButtonDeleteProgram programId={item.id} />
                    <AppButton
                      buttonTitle="Update"
                      onClick={navigateUpdateProgram(item.id)}
                    />
                  </>
                )}

                <ButtonJoinProgram program={item} />
                <AppButton
                  buttonTitle="View Detail"
                  onClick={showProgramDetail(item.id)}
                />
                <AppButton
                  buttonTitle="Show attendances"
                  onClick={showAttendances(item.id)}
                />
                <AppButton buttonTitle="Test" />
              </AppWithCoverCard>
            );
          })}
        </div>
        <ListAttendancesModal />
        <ProgramDetailModal />
      </div>
    </EducationProgramContext.Provider>
  );
};

export default EducationProgramManagement;
