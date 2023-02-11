import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import {
  APP_ROLES,
  FORM_ITEM_TYPES,
  MANAGER_EXAMPLE,
} from "@/constants/common";
import { useGetEmployees } from "@/hooks/employee";
import { dataToOptions } from "@/utils";
import { useMemo } from "react";

const { TEXT, TEXTAREA, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange } = useFormikContext() as any;

  const { data: employees = {} } = useGetEmployees();

  const suitableEmployees = useMemo(() => {
    const roleEmployee = employees.data?.filter(
      (em: any) => em.role === APP_ROLES.EMPLOYEE.value
    );
    return dataToOptions(roleEmployee);
  }, [employees]);

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="name"
        label="Name"
        value={values.name}
        type={TEXT}
        onChange={handleChange}
        placeholder="Enter delivery name"
      />
      <FormItem
        name="description"
        label="Description"
        value={values.description}
        type={TEXTAREA}
        onChange={handleChange}
        placeholder="Your description here"
      />
      <FormItem
        name="managerId"
        label="Manager"
        value={values.managerId}
        type={SELECT}
        options={suitableEmployees}
        placeholder="Select manager"
      />
      <AppButton buttonTitle="Add" htmlType="submit" />
    </Form>
  );
};

export default FormFields;
