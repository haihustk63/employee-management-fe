import AppButton from "@/components/AppButton";
import AppModal from "@/components/AppModal";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { EmployeeManagementContext } from "@/pages/employee";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeProfile from "./Profile";

const EmployeeProfileModal = () => {
  const navigate = useNavigate();

  const {
    employee,
    employeeId,
    toggleEmployeeProfileModal,
    showEmployeeProfileModal,
  } = useContext(EmployeeManagementContext) as any;

  const navigateToUpdateEmployee = () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.EMPLOYEE_UPDATE(employeeId));
  };

  const Footer = (
    <AppButton buttonTitle="Update" onClick={navigateToUpdateEmployee} />
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
