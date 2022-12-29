import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { ASSESSMENT, FORM_ITEM_TYPES } from "@/constants/common";
import { useGetEmployees } from "@/hooks/employee";
import AppDatePicker from "@/components/AppDatePicker";
import { dataToOptions, mergeName } from "@/utils";

const { SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const { data: employeeList = [] } = useGetEmployees();
  const employeeOption = employeeList.map((employee: any) => ({
    value: employee.id,
    key: employee.id,
    label: mergeName(employee),
  }));

  const handleDatePickerChange = (newDate: any) => {
    setFieldValue("appointmentTime", newDate);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="interviewerId"
        label="Interviewer"
        value={values.interviewerId}
        type={SELECT}
        options={employeeOption}
        showSearch
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
        placement="bottomLeft"
        onChange={handleDatePickerChange}
        value={values.appointmentTime}
      />
      <AppButton buttonTitle="Update" htmlType="submit" />
    </Form>
  );
};

export default FormFields;
