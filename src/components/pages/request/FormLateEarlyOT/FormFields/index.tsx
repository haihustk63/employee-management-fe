import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import AppDatePicker from "@/components/AppDatePicker";
import FormItem from "@/components/FormItem";
import { LATE_EARLY_OT_OPTIONS } from "@/constants/request";
import { FORM_ITEM_TYPES } from "@/constants/common";

const { TEXT, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const handleDatePickerChange = (newDate: any) => {
    setFieldValue("date", newDate);
  };
  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="type"
        label="Type"
        value={values.type}
        type={SELECT}
        options={LATE_EARLY_OT_OPTIONS}
        onChange={handleChange}
      />
      <AppDatePicker value={values.date} onChange={handleDatePickerChange} />
      <FormItem
        name="duration"
        label="Duration"
        value={values.duration}
        type={TEXT}
        onChange={handleChange}
      />
      <AppButton buttonTitle="Send" htmlType="submit" />
    </Form>
  );
};

export default FormFields;
