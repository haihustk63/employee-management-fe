import moment from "moment";
import { FC, useEffect, useRef } from "react";

import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import { IEmployeeFormProps } from "./interface";
import { createEmployeeProfileSchema } from "@/schemas";
import { useGetEmployeeById } from "@/hooks/employee";

const initialValues: IEmployeeFormProps = {
  firstName: "",
  middleName: "",
  lastName: "",
  phoneNumber: "",
  dateOfBirth: moment(Date.now()),
  positionId: undefined,
  deliveryId: undefined,
  workingStatus: "OFFICIAL",
  role: undefined,
  joinDate: moment(Date.now()),
  paidLeaveCount: 0,
};

const EmployeeForm: FC<{ employeeId?: any; onSubmit?: any }> = ({
  employeeId,
  onSubmit,
}) => {
  const formRef = useRef() as any;
  const { data } = useGetEmployeeById(employeeId);

  useEffect(() => {
    if (data) {
      const {
        firstName = "",
        middleName = "",
        lastName = "",
        phoneNumber = "",
        dateOfBirth = moment(Date.now()),
        positionId = undefined,
        deliveryId = undefined,
        workingStatus = "OFFICIAL",
        deliveryEmployee: { isManager = false },
        joinDate = moment(Date.now()),
        paidLeaveCount = 0,
      } = data as any;

      console.log(dateOfBirth, joinDate);

      formRef.current.setFieldValue("firstName", firstName);
      formRef.current.setFieldValue("middleName", middleName);
      formRef.current.setFieldValue("lastName", lastName);
      formRef.current.setFieldValue("phoneNumber", phoneNumber);
      formRef.current.setFieldValue("dateOfBirth", moment(dateOfBirth));
      formRef.current.setFieldValue("positionId", positionId);
      formRef.current.setFieldValue("deliveryId", deliveryId);
      formRef.current.setFieldValue("workingStatus", workingStatus);
      formRef.current.setFieldValue("joinDate", moment(joinDate));
      formRef.current.setFieldValue("paidLeaveCount", paidLeaveCount);
      formRef.current.setFieldValue("role", isManager ? 1 : 0);
    }
  }, [data]);

  return (
    <div className="employee-form">
      <AppForm<IEmployeeFormProps>
        title="Employee Form"
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
