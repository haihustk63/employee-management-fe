import EmployeeForm from "@/components/pages/employee/EmployeeForm";
import { useUpdateEmployeeProfile } from "@/hooks/employee";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { useParams } from "react-router-dom";

const UpdateEmployee = () => {
  const { employeeId = "" } = useParams();
  const {
    mutate: onUpdate,
    isError,
    isSuccess,
  } = useUpdateEmployeeProfile(employeeId);

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "Update employee profile successfully",
  });

  const handleUpdate = (values: any) => {
    const formData = new FormData();
    const { avatar, ...rest } = values;
    formData.append("data", JSON.stringify(rest));

    if (avatar) {
      formData.append("avatar", avatar);
    }
    onUpdate({
      data: formData,
      config: {
        headers: { "Content-Type": "multipart/form-data" },
      },
    });
  };

  return (
    <div className="update-employee">
      <EmployeeForm employeeId={employeeId} onSubmit={handleUpdate} />
    </div>
  );
};

export default UpdateEmployee;
