import { useSearchParams } from "react-router-dom";

import EmployeeList from "@/components/pages/employee/EmployeeList";
import Search from "@/components/pages/employee/Search";
import { useGetEmployees } from "@/hooks/employee";
import { createContext, useMemo, useState } from "react";

export const EmployeeManagementContext = createContext({}) as any;

const EmployeeManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const { data, isLoading, isFetching } = useGetEmployees(params);

  return (
    <EmployeeManagementContext.Provider
      value={{ params, setSearchParams, searchParams }}
    >
      <div className="employee-management">
        <Search />
        <EmployeeList loading={isLoading || isFetching} employeeList={data} />
      </div>
    </EmployeeManagementContext.Provider>
  );
};

export default EmployeeManagement;
