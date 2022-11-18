import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import AppDatePicker from "@/components/AppDatePicker";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES, MANAGER_EXAMPLE } from "@/constants/common";

const { TEXT, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const handleDatePickerChange = (newDate: any) => {
    setFieldValue("joinDate", newDate);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="name"
        value={values.name}
        type={TEXT}
        onChange={handleChange}
        placeholder="Keywords: name, email, phone"
      />
      <FormItem
        name="delivery"
        value={values.delivery}
        type={SELECT}
        options={MANAGER_EXAMPLE}
        placeholder="Select delivery"
        onChange={handleChange}
      />
      <FormItem
        name="position"
        value={values.position}
        type={SELECT}
        options={MANAGER_EXAMPLE}
        placeholder="Select position"
        onChange={handleChange}
      />
      <FormItem
        name="role"
        value={values.role}
        type={SELECT}
        options={MANAGER_EXAMPLE}
        onChange={handleChange}
        placeholder="Select role"
      />
      <FormItem
        name="workingStatus"
        value={values.workingStatus}
        type={SELECT}
        options={MANAGER_EXAMPLE}
        onChange={handleChange}
        placeholder="Select Working Status"
      />
      <AppDatePicker
        value={values.joinDate}
        onChange={handleDatePickerChange}
      />
    </Form>
  );
};

export default FormFields;
