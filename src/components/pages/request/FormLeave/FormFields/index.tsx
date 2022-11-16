import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import {
  LEAVING_TIME_OPTIONS,
  LEAVING_TYPE_OPTIONS,
} from "@/constants/request";
import { FORM_ITEM_TYPES } from "@/constants/common";
import AppDatePicker from "@/components/AppDatePicker";

const { TEXTAREA, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const handleDatePickerChange = (newDate: any) => {
    setFieldValue("date", newDate);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="leavingTime"
        label="Leaving Time"
        value={values.leavingTime}
        type={SELECT}
        options={LEAVING_TIME_OPTIONS}
        onChange={handleChange}
      />
      <FormItem
        name="leavingType"
        label="Leaving Type"
        value={values.leavingType}
        type={SELECT}
        options={LEAVING_TYPE_OPTIONS}
        onChange={handleChange}
      />
      <AppDatePicker value={values.date} onChange={handleDatePickerChange} />
      <FormItem
        name="reason"
        label="Reason"
        value={values.reason}
        type={TEXTAREA}
        placeholder="Enter your reason"
        onChange={handleChange}
      />

      <AppButton buttonTitle="Send" htmlType="submit" />
    </Form>
  );
};

export default FormFields;
