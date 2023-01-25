import { useSearchParams } from "react-router-dom";

import EmployeeList from "@/components/pages/employee/EmployeeList";
import Search from "@/components/pages/employee/Search";
import { useGetEmployees } from "@/hooks/employee";
import { createContext, useMemo, useState } from "react";
import useModal from "@/hooks/useModal";
import EmployeeProfileModal from "@/components/pages/employee/EmployeeProfile";
import { Typography } from "antd";

const { Text } = Typography;

export const EmployeeManagementContext = createContext({}) as any;

const EmployeeManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [employeeId, setEmployeeId] = useState();
  const {
    handleToggleModal: toggleEmployeeProfileModal,
    showModal: showEmployeeProfileModal,
  } = useModal();

  const params = useMemo(() => {
    return {
      delivery: searchParams.get("delivery"),
      keyword: searchParams.get("keyword"),
      position: searchParams.get("position"),
      role: searchParams.get("role"),
      workingStatus: searchParams.get("workingStatus"),
      joinDate: searchParams.get("joinDate"),
    };
  }, [searchParams]);

  const {
    data: employees = [],
    isLoading,
    isFetching,
  } = useGetEmployees(params);

  const employee = useMemo(() => {
    if (employeeId) {
      return employees.find((employee) => employee.id === employeeId);
    }
    return {};
  }, [employeeId]);

  return (
    <EmployeeManagementContext.Provider
      value={{
        params,
        employeeId,
        employee,
        searchParams,
        showEmployeeProfileModal,
        setSearchParams,
        toggleEmployeeProfileModal,
        setEmployeeId,
      }}
    >
      <div className="employee-management">
        <Text className="app-title">Employees</Text>
        <Search />
        <EmployeeList
          loading={isLoading || isFetching}
          dataSource={employees}
        />
        <EmployeeProfileModal />
      </div>
    </EmployeeManagementContext.Provider>
  );
};

export default EmployeeManagement;
