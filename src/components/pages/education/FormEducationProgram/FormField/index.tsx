import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import AppFormErrorMessage from "@/components/AppFormErrorMessage";
import AppTextEditor from "@/components/AppTextEditor";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES, JOB_LEVELS, JOB_TYPES } from "@/constants/common";
import { dataToOptions, disabledDateBeforeToday } from "@/utils";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetEmployees } from "@/hooks/employee";
import AppDatePicker from "@/components/AppDatePicker";
import { useGetEducationProgramById } from "@/hooks/education";

import { dayjs } from "@/dayjs-config";

const { TEXT, SELECT, INPUT_NUMBER } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { programId = "" } = useParams();
  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const { data: employees = [] } = useGetEmployees();
  const { data: program = {} } = useGetEducationProgramById(programId) as any;

  useEffect(() => {
    if (Object.keys(program).length > 0) {
      const { title, content, time, tutor, duration } = program;
      setFieldValue("title", title);
      setFieldValue("content", content);
      setFieldValue("duration", duration);
      setFieldValue("time", dayjs(time ?? Date.now()));
      setFieldValue("tutorId", tutor?.id);
    }
  }, [program]);

  const buttonTitle = useMemo(() => {
    if (programId) {
      return "Update";
    } else {
      return "Create";
    }
  }, [programId]);

  const handleChangeEditor = (value: string) => {
    setFieldValue("content", value);
  };

  const handleDatePickerChange = (newDate: any) => {
    setFieldValue("time", newDate);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="title"
        label="Program title"
        value={values.title}
        type={TEXT}
        onChange={handleChange}
        placeholder="Enter program title"
      />

      <AppTextEditor
        onChange={handleChangeEditor}
        initialValue={values.content}
      />
      {!!errors.content && !!touched.content && (
        <AppFormErrorMessage message={errors.content} />
      )}

      <AppDatePicker
        value={values.time}
        onChange={handleDatePickerChange}
        pickerLabel="Time"
        format="YYYY-MM-DD HH:mm"
        disabledDate={disabledDateBeforeToday}
        showTime={{ defaultValue: dayjs("00:00", "HH:mm") }}
      />

      <FormItem
        name="duration"
        label="Duration"
        value={values.duration}
        type={INPUT_NUMBER}
        min={0}
        placeholder="Choose duration"
      />

      <FormItem
        name="tutorId"
        label="Tutor"
        value={values.tutorId}
        type={SELECT}
        options={dataToOptions(employees)}
        placeholder="Choose tutor"
      />
      <AppButton buttonTitle={buttonTitle} htmlType="submit" />
    </Form>
  );
};

export default FormFields;
