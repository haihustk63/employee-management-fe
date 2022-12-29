import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES } from "@/constants/common";
import { useGetEmployees } from "@/hooks/employee";
import { dataToOptions } from "@/utils";

const { TEXT, PASSWORD, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;
  const { data: employees = [] } = useGetEmployees();

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="email"
        label="Email"
        value={values.email}
        type={TEXT}
        onChange={handleChange}
        placeholder="Enter email"
      />
      <FormItem
        name="password"
        label="Password"
        value={values.password}
        type={PASSWORD}
        onChange={handleChange}
        placeholder="Your password"
      />
      <FormItem
        name="employeeId"
        label="Employee"
        value={values.employeeId}
        type={SELECT}
        options={dataToOptions(employees)}
        placeholder="Choose a employee"
      />

      <AppButton buttonTitle="Create" htmlType="submit" />
    </Form>
  );
};

export default FormFields;
