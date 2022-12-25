import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES, MANAGER_EXAMPLE } from "@/constants/common";
import { useContext, useMemo } from "react";
import { PositionManagementContext } from "@/pages/position";

const { TEXT, TEXTAREA, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const { positionUpdateId } = useContext(PositionManagementContext) as any;

  const buttonTitle = useMemo(() => {
    if (positionUpdateId !== undefined) {
      return "Update";
    } else {
      return "Create";
    }
  }, [positionUpdateId]);

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
      <AppButton buttonTitle={buttonTitle} htmlType="submit" />
    </Form>
  );
};

export default FormFields;
