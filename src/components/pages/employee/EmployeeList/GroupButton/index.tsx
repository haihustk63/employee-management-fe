import { FC } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "@/components/AppButton";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useDeleteEmployeeProfile } from "@/hooks/employee";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

const EmployeeGroupButton: FC<{ record: any }> = ({ record }) => {
  const navigate = useNavigate();

  const {
    mutate: onDelete,
    isError,
    isSuccess,
  } = useDeleteEmployeeProfile(record.id);

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "Delete employee profile successfully",
  });

  const deleteEmployee = () => {
    onDelete(record.id);
  };

  const handleClickButtonViewDetail = () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.EMPLOYEE_UPDATE(record.id));
  };
  return (
    <div>
      <AppButton
        buttonTitle="View Employees"
        htmlType="button"
        onClick={handleClickButtonViewDetail}
      />
      <AppButton
        buttonTitle="Delete"
        htmlType="button"
        onClick={deleteEmployee}
      />
    </div>
  );
};

export default EmployeeGroupButton;
