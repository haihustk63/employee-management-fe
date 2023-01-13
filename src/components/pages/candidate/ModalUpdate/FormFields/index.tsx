import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import AppDatePicker from "@/components/AppDatePicker";
import FormItem from "@/components/FormItem";
import { ASSESSMENT, FORM_ITEM_TYPES } from "@/constants/common";
import { useGetEmployees } from "@/hooks/employee";
import { CandidateProfileContext } from "@/pages/candidate";
import { dataToOptions } from "@/utils";
import { useContext } from "react";

const { SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { values, handleSubmit, setFieldValue } = useFormikContext() as any;

  const { data: employees = [] } = useGetEmployees();

  const handleDatePickerChange = (newDate: any) => {
    setFieldValue("appointmentTime", newDate);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="account"
        label="Account"
        value={values.account}
        type={SELECT}
        placeholder="No account selected"
        disabled
      />
      <FormItem
        name="interviewerId"
        label="Interviewer"
        value={values.interviewerId}
        type={SELECT}
        options={dataToOptions(employees)}
        placeholder="Choose interviewer"
      />
      <FormItem
        name="assessment"
        label="Assessment"
        value={values.assessment}
        type={SELECT}
        options={dataToOptions(ASSESSMENT)}
        placeholder="Choose assessment"
      />
      <AppDatePicker
        showToday
        pickerLabel="Appointment Time"
        placement="bottomLeft"
        onChange={handleDatePickerChange}
        value={values.appointmentTime}
      />
      <AppButton buttonTitle="Update" htmlType="submit" />
    </Form>
  );
};

export default FormFields;
