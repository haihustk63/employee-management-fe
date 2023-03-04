import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { APP_MAX_LIMIT, FORM_ITEM_TYPES } from "@/constants/common";
import { useGetEmployees } from "@/hooks/employee";
import { DeliveryManagementContext } from "@/pages/delivery";
import { dataToOptions } from "@/utils";
import { useContext, useMemo } from "react";

const { TEXT, TEXTAREA, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange } = useFormikContext() as any;
  const { deliveryUpdateId } = useContext(DeliveryManagementContext) as any;

  const { data: employees = {} } = useGetEmployees({ limit: APP_MAX_LIMIT });

  const employeeOptions = useMemo(() => {
    return dataToOptions(employees.data);
  }, [employees]);

  const buttonTitle = useMemo(() => {
    if (deliveryUpdateId) return "Update";
    return "Create";
  }, [deliveryUpdateId]);

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
        options={employeeOptions}
        placeholder="Select manager"
      />
      <AppButton buttonTitle={buttonTitle} htmlType="submit" />
    </Form>
  );
};

export default FormFields;
