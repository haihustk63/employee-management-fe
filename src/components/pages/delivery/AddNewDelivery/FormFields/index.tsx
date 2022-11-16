import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES, MANAGER_EXAMPLE } from "@/constants/common";

const { TEXT, TEXTAREA, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;
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
        options={MANAGER_EXAMPLE}
        onChange={handleChange}
        placeholder="Select manager"
      />
      <AppButton buttonTitle="Add" htmlType="submit" />
    </Form>
  );
};

export default FormFields;
