import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { WORKING_REMOTE_TIME_OPTIONS } from "@/constants/request";
import { FORM_ITEM_TYPES } from "@/constants/common";
import AppDatePicker from "@/components/AppDatePicker";

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
        name="workingTime"
        label="Working Remote Time"
        value={values.workingTime}
        type={SELECT}
        options={WORKING_REMOTE_TIME_OPTIONS}
        onChange={handleChange}
      />
      <AppDatePicker value={values.date} onChange={handleDatePickerChange} />
      <AppButton buttonTitle="Send" htmlType="submit" />
    </Form>
  );
};

export default FormFields;
