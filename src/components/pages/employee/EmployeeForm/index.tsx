import moment from "moment";
import { FC, useEffect, useRef } from "react";

import FormFields from "./FormFields";
import { IEmployeeFormProps } from "./interface";
import AppForm from "@/components/AppForm";

const initialValues: IEmployeeFormProps = {
  firstName: "",
  middleName: "",
  lastName: "",
  phoneNumber: "",
  dateOfBirth: moment(Date.now()),
  position: undefined,
  role: undefined,
};

const EmployeeForm: FC<{ employeeId?: any }> = ({ employeeId }) => {
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
        handleSubmitForm={null}
        initialValues={initialValues}
        innerRef={formRef}
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default EmployeeForm;
