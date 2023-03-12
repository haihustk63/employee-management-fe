import AppButton from "@/components/AppButton";
import AppModal from "@/components/AppModal";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { EmployeeManagementContext } from "@/pages/employee";
import { useContext } from "react";
import EmployeeProfile from "./Profile";

const EmployeeProfileModal = () => {

  const {
    employee,
    employeeId,
    toggleEmployeeProfileModal,
    showEmployeeProfileModal,
  } = useContext(EmployeeManagementContext) as any;

  const Footer = (
    <a
      href={DYNAMIC_APP_PAGE_ROUTES.EMPLOYEE_UPDATE(employeeId)}
      target="_blank"
    >
      <AppButton buttonTitle="Update" />
    </a>
  );

  return (
    <AppModal
      open={showEmployeeProfileModal}
      onCancel={toggleEmployeeProfileModal}
      footer={Footer}
      wrapClassName="employee-profile-modal"
    >
      <EmployeeProfile employee={employee} />
    </AppModal>
  );
};

export default EmployeeProfileModal;
