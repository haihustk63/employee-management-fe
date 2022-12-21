import moment from "moment";
import { FC, useEffect, useRef } from "react";

import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import { IEmployeeFormProps } from "./interface";
import { createEmployeeProfileSchema } from "@/schemas";

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

  useEffect(() => {
    if (employeeId) {
      new Promise((res, rej) => {
        setTimeout(() => {
          res({ firstName: "Harry", lastName: "haipham@example.com" });
        }, 200);
      }).then(({ firstName, lastName }: any) => {
        formRef.current.setFieldValue("firstName", firstName);
        formRef.current.setFieldValue("lastName", lastName);
      });
    }
  }, [employeeId]);

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
