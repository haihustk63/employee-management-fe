import EmployeeForm from "@/components/pages/employee/EmployeeForm";
import { useCreateEmployeeProfile } from "@/hooks/employee";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

const CreateNewEmployee = () => {
  const {
    mutate: onCreateProfile,
    isSuccess,
    isError,
    isLoading,
  } = useCreateEmployeeProfile();

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: "A new profile has been created",
  });

  const onSubmit = (values: any) => {
    const formData = new FormData();
    const { avatar, ...rest } = values;
    formData.append("avatar", avatar);
    formData.append("data", JSON.stringify(rest));
    onCreateProfile({
      data: formData,
      config: {
        headers: { "Content-Type": "multipart/form-data" },
      },
    });
  };

  return (
    <div className="create-new-employee">
      <EmployeeForm onSubmit={onSubmit} loading={isLoading} />
    </div>
  );
};

export default CreateNewEmployee;
