import moment from "moment";
import { FC, useEffect, useRef } from "react";

import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import { IEmployeeFormProps } from "./interface";
import { createEmployeeProfileSchema } from "@/schemas";
import { useGetEmployeeById } from "@/hooks/employee";
import dayjs from "dayjs";

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
  joinDate: dayjs(Date.now()),
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
      let {
        firstName = "",
        middleName = "",
        lastName = "",
        phoneNumber = "",
        dateOfBirth,
        positionId = undefined,
        workingStatus = "OFFICIAL",
        deliveryEmployee,
        joinDate,
        paidLeaveCount = 0,
      } = data as any;

      dateOfBirth = dayjs(dateOfBirth ?? Date.now());
      joinDate = dayjs(joinDate ?? Date.now());

      console.log(dateOfBirth, joinDate);

      formRef.current.setFieldValue("firstName", firstName);
      formRef.current.setFieldValue("middleName", middleName);
      formRef.current.setFieldValue("lastName", lastName);
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
      formRef.current.setFieldValue(
        "role",
        deliveryEmployee?.isManager ? 2 : 1
      );
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
