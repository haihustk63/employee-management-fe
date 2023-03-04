import { Switch, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import AppButton from "@/components/AppButton";
import AppPrimaryCard from "@/components/AppCard/Primary";
import AppPagination from "@/components/AppPagination";
import AppRate from "@/components/AppRate";
import AppSearchKeyword from "@/components/AppSearchKeyword";
import AppTag from "@/components/AppTag";
import AppTooltip from "@/components/AppTooltip";
import ButtonDeleteProgram from "@/components/pages/education/ButtonDeleteProgram";
import ButtonJoinProgram from "@/components/pages/education/ButtonJoinProgram";
import ListAttendancesModal from "@/components/pages/education/ListAttendancesModal";
import ProgramDetailModal from "@/components/pages/education/ProgramDetailModal";
import { APP_ROLES } from "@/constants/common";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { dayjs } from "@/dayjs-config";
import {
  useGetAllEducationPrograms,
  useGetMyEducationPrograms
} from "@/hooks/education";
import useModal from "@/hooks/useModal";
import { useTableParams } from "@/hooks/useTableParams";
import { currentUserAtom } from "@/modules/currentUser";
import { mergeName } from "@/utils";
import { createContext, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

const { Title, Text } = Typography;

export const EducationProgramContext = createContext({});

const EducationProgramManagement = () => {
  const navigate = useNavigate();
  const { employee } = useRecoilValue(currentUserAtom);
  const [selectProgramId, setSelectProgramId] = useState();
  const [isShowMyProgram, setIsShowMyProgram] = useState(false);

  const {
    showModal: showListAttendancesModal,
    handleToggleModal: toggleListAttendancesModal,
  } = useModal();
  const {
    showModal: showProgramDetailModal,
    handleToggleModal: toggleProgramDetailModal,
  } = useModal();

  const {
    isInit,
    queryParams,
    searchParams,
    setQueryParams,
    setIsInit,
    resetPageParams,
  } = useTableParams();

  useEffect(() => {
    setQueryParams({ page: 1 });
  }, []);

  const { data: allPrograms = [] } = useGetAllEducationPrograms(queryParams);
  const { data: myPrograms = [] } = useGetMyEducationPrograms(queryParams);

  const programs = useMemo(() => {
    if (isShowMyProgram) {
      return myPrograms.data;
    }
    return allPrograms.data;
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

  const renderCardTitle = (title: string, averageRate: number) => {
    return (
      <>
        <span>{title}</span>
        <span>
          <AppRate value={averageRate} disabled />
        </span>
      </>
    );
  };

  const totalPrograms = useMemo(() => {
    if (isShowMyProgram) {
      return myPrograms.total;
    }
    return allPrograms.total;
  }, [isShowMyProgram, allPrograms, myPrograms]);

  const changePage = (page: number) => {
    setQueryParams({ page });
  };

  return (
    <EducationProgramContext.Provider
      value={{
        showListAttendancesModal,
        showProgramDetailModal,
        selectProgramId,
        isInit,
        queryParams,
        searchParams,
        allPrograms: allPrograms.data,
        toggleListAttendancesModal,
        toggleProgramDetailModal,
        setQueryParams,
        setIsInit,
        resetPageParams,
      }}
    >
      <div className="education-program-management">
        <div className="title">
          <Text className="app-title">Education Program Management</Text>
          <AppTooltip title="Click here to view the programs you joined">
            <Switch checked={isShowMyProgram} onChange={toggleSwitch} />
          </AppTooltip>
        </div>
        <AppSearchKeyword
          isInit={isInit}
          queryParams={queryParams}
          searchParams={searchParams}
          placeholder="Search by program title"
          resetPageParams={resetPageParams}
          setIsInit={setIsInit}
          setQueryParams={setQueryParams}
        />
        <div className="list">
          {programs?.map((item: any) => {
            return (
              <AppPrimaryCard
                key={item.id}
                title={renderCardTitle(item.title, item.averageRate)}
                hasBoxShadow
              >
                <div className="description">
                  <AppTag color="#1e5ac7">
                    Tutor: {item.tutor ? mergeName(item.tutor) : "WIP"}
                  </AppTag>
                  <div className="time">
                    <AppTag color="success">
                      {dayjs(item.time).format("DD-MM-YYYY")}
                    </AppTag>
                    <AppTag color="warning">
                      {`${dayjs(item.time).format("HH:mm")}-${dayjs(
                        item.endTime
                      ).format("HH:mm")}`}
                    </AppTag>
                  </div>
                </div>
                <div className="actions">
                  <ButtonJoinProgram program={item} />
                  <AppButton
                    buttonTitle="Detail"
                    onClick={showProgramDetail(item.id)}
                  />
                  <AppButton
                    buttonTitle="Show attendances"
                    onClick={showAttendances(item.id)}
                  />

                  {(employee?.role === APP_ROLES.ADMIN.value ||
                    employee?.role === APP_ROLES.SUPER_ADMIN.value) && (
                    <>
                      <AppButton
                        buttonTitle="Update"
                        onClick={navigateUpdateProgram(item.id)}
                      />
                      <ButtonDeleteProgram programId={item.id} />
                    </>
                  )}
                </div>
              </AppPrimaryCard>
            );
          })}

          <AppPagination
            total={totalPrograms}
            onChangePagination={changePage}
            current={queryParams?.page}
          />
        </div>
        <ListAttendancesModal />
        <ProgramDetailModal />
      </div>
    </EducationProgramContext.Provider>
  );
};

export default EducationProgramManagement;
