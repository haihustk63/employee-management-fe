import EmployeeForm from "@/components/pages/employee/EmployeeForm";
import { useParams } from "react-router-dom";

const UpdateEmployee = () => {
  const { employeeId } = useParams();
  return (
    <div className="update-employee">
      <EmployeeForm employeeId={employeeId} />
    </div>
  );
};

export default UpdateEmployee;
