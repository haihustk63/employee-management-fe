import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import AppDatePicker from "@/components/AppDatePicker";
import FormItem from "@/components/FormItem";
import { CHECK_IN_OUT_OPTIONS } from "@/constants/request";
import { FORM_ITEM_TYPES } from "@/constants/common";

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
        name="checkInOutType"
        label="Type"
        value={values.checkInOutType}
        type={SELECT}
        options={CHECK_IN_OUT_OPTIONS}
        onChange={handleChange}
      />
      <AppDatePicker value={values.date} onChange={handleDatePickerChange} />
      <FormItem
        name="note"
        label="Note"
        value={values.note}
        type={TEXTAREA}
        onChange={handleChange}
        placeholder="Your note here"
      />
      <AppButton buttonTitle="Send" htmlType="submit" />
    </Form>
  );
};

export default FormFields;
