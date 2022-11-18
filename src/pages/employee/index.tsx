import EmployeeList from "@/components/pages/employee/EmployeeList";
import Search from "@/components/pages/employee/Search";
import React from "react";

const EmployeeManagement = () => {
  return (
    <div className="employee-management">
      <Search />
      <EmployeeList />
    </div>
  );
};

export default EmployeeManagement;
