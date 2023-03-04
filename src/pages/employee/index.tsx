
import EmployeeList from "@/components/pages/employee/EmployeeList";
import EmployeeProfileModal from "@/components/pages/employee/EmployeeProfileModal";
import Search from "@/components/pages/employee/Search";
import { useGetEmployees } from "@/hooks/employee";
import useModal from "@/hooks/useModal";
import { useTableParams } from "@/hooks/useTableParams";
import { Typography } from "antd";
import { createContext, useMemo, useState } from "react";

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
        <Text className="app-title">Employee Management</Text>
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
