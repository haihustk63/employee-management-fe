import EmployeeForm from "@/components/pages/employee/EmployeeForm";
import { useCreateEmployeeProfile } from "@/hooks/employee";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import React from "react";

const CreateNewEmployee = () => {
  const {
    mutate: onCreateProfile,
    isSuccess,
    isError,
  } = useCreateEmployeeProfile();

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: "A new profile has been created",
  });

  const onSubmit = (values: any) => {
    const data = {
      ...values,
      isManager: values.role === 0 ? false : true,
    };

    delete data.role;
    onCreateProfile(data);
  };

  return (
    <div className="create-new-employee">
      <EmployeeForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreateNewEmployee;
