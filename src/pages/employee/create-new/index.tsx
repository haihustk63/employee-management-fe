import EmployeeForm from "@/components/pages/employee/EmployeeForm";
import { useCreateEmployeeProfile } from "@/hooks/employee";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

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
    onCreateProfile(values);
  };

  return (
    <div className="create-new-employee">
      <EmployeeForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreateNewEmployee;
