import { useSearchParams } from "react-router-dom";

import EmployeeList from "@/components/pages/employee/EmployeeList";
import Search from "@/components/pages/employee/Search";
import { useGetEmployees } from "@/hooks/employee";
import { createContext, useMemo, useState } from "react";
import useModal from "@/hooks/useModal";
import EmployeeProfileModal from "@/components/pages/employee/EmployeeProfile";
import { Typography } from "antd";
import { useTableParams } from "@/hooks/useTableParams";

const { Text } = Typography;

export const EmployeeManagementContext = createContext({}) as any;

const EmployeeManagement = () => {
  const {
    isInit,
    needResetPage,
    queryParams,
    searchParams,
    onChangeTableParams,
    resetPageParams,
    setIsInit,
    setQueryParams,
  } = useTableParams();

  const [employeeId, setEmployeeId] = useState();
  const {
    handleToggleModal: toggleEmployeeProfileModal,
    showModal: showEmployeeProfileModal,
  } = useModal();

  const {
    data: dataSource = {},
    isLoading,
    isFetching,
  } = useGetEmployees(queryParams);

  const employee = useMemo(() => {
    if (employeeId) {
      return dataSource.data?.find(
        (employee: any) => employee.id === employeeId
      );
    }
    return {};
  }, [employeeId, dataSource]);

  return (
    <EmployeeManagementContext.Provider
      value={{
        queryParams,
        employeeId,
        employee,
        searchParams,
        showEmployeeProfileModal,
        isInit,
        needResetPage,
        toggleEmployeeProfileModal,
        setEmployeeId,
        onChangeTableParams,
        resetPageParams,
        setIsInit,
        setQueryParams,
      }}
    >
      <div className="employee-management">
        <Text className="app-title">Employees</Text>
        <Search />
        <EmployeeList
          loading={isLoading || isFetching}
          dataSource={dataSource}
        />
        <EmployeeProfileModal />
      </div>
    </EmployeeManagementContext.Provider>
  );
};

export default EmployeeManagement;
