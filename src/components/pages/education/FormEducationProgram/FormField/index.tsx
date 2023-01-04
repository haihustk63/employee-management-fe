import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import AppFormErrorMessage from "@/components/AppFormErrorMessage";
import AppTextEditor from "@/components/AppTextEditor";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES, JOB_LEVELS, JOB_TYPES } from "@/constants/common";
import { dataToOptions } from "@/utils";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetEmployees } from "@/hooks/employee";
import AppDatePicker from "@/components/AppDatePicker";
import { useGetEducationProgramById } from "@/hooks/education";

import { dayjs } from "@/dayjs-config";

const { TEXT, SELECT, INPUT_NUMBER } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { programId = "" } = useParams();
  const { values, handleSubmit, handleChange, setFieldValue, errors, touched } =
    useFormikContext() as any;

  const { data: employees = [] } = useGetEmployees();
  const { data: program = {} } = useGetEducationProgramById(programId) as any;

  useEffect(() => {
    if (Object.keys(program).length > 0) {
      const { title, content, maxSlot, time, tutor } = program;
      setFieldValue("title", title);
      setFieldValue("content", content);
      setFieldValue("maxSlot", maxSlot);
      setFieldValue("time", dayjs(time ?? Date.now()));
      setFieldValue("tutorId", tutor?.id);
    }
  }, [program]);

  const buttonTitle = useMemo(() => {
    if (programId !== undefined || programId !== null) {
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

      <FormItem
        name="maxSlot"
        label="Max slot"
        value={values.maxSlot}
        min={0}
        type={INPUT_NUMBER}
        placeholder="Enter max slot"
      />

      <AppDatePicker
        value={values.time}
        onChange={handleDatePickerChange}
        pickerLabel="Time"
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
