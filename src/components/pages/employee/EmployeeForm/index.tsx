import { FC, useEffect, useRef } from "react";

import AppForm from "@/components/AppForm";
import { BASIC_ROLES, WORKING_STATUS } from "@/constants/common";
import { useGetEmployeeById } from "@/hooks/employee";
import { createEmployeeProfileSchema } from "@/schemas";
import dayjs from "dayjs";
import FormFields from "./FormFields";
import { IEmployeeFormProps } from "./interface";

const initialValues: IEmployeeFormProps = {
  firstName: "",
  middleName: "",
  lastName: "",
  phoneNumber: "",
  dateOfBirth: dayjs(Date.now()),
  positionId: undefined,
  deliveryId: undefined,
  workingStatus: 1,
  role: 1,
  email: undefined,
  joinDate: dayjs(Date.now()),
  paidLeaveCount: 0,
  avatar: undefined,
};

const EmployeeForm: FC<{ employeeId?: any; onSubmit?: any }> = ({
  employeeId,
  onSubmit,
}) => {
  const formRef = useRef() as any;
  const { data: employee } = useGetEmployeeById(employeeId);

  useEffect(() => {
    if (employee) {
      let {
        firstName = "",
        middleName = "",
        lastName = "",
        phoneNumber = "",
        dateOfBirth,
        positionId = undefined,
        workingStatus = WORKING_STATUS.official.value,
        deliveryEmployee,
        joinDate,
        role = BASIC_ROLES.employee.value,
        paidLeaveCount = 0,
        employeeAccount,
      } = employee as any;

      dateOfBirth = dayjs(dateOfBirth ?? Date.now());
      joinDate = dayjs(joinDate ?? Date.now());

      formRef.current.setFieldValue("firstName", firstName);
      formRef.current.setFieldValue("middleName", middleName);
      formRef.current.setFieldValue("lastName", lastName);
      formRef.current.setFieldValue("email", employeeAccount?.email);
      formRef.current.setFieldValue("phoneNumber", phoneNumber);
      formRef.current.setFieldValue("dateOfBirth", dayjs(dateOfBirth));
      formRef.current.setFieldValue("positionId", positionId);
      formRef.current.setFieldValue(
        "deliveryId",
        deliveryEmployee?.delivery?.id
      );
      formRef.current.setFieldValue("workingStatus", workingStatus);
      formRef.current.setFieldValue("joinDate", dayjs(joinDate));
      formRef.current.setFieldValue("paidLeaveCount", paidLeaveCount);
      formRef.current.setFieldValue("role", role);
    }
  }, [employee]);

  return (
    <div className="employee-form">
      <AppForm<IEmployeeFormProps>
        title="New Employee"
        handleSubmitForm={onSubmit}
        initialValues={initialValues}
        innerRef={formRef}
        validationSchema={createEmployeeProfileSchema}
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default EmployeeForm;
