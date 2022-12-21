import EmployeeForm from "@/components/pages/employee/EmployeeForm";
import React from "react";

const CreateNewEmployee = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="create-new-employee">
      <EmployeeForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreateNewEmployee;
