import { useContext, useEffect, useMemo } from "react";
import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { LEAVING_TIME, REQUEST_TYPES } from "@/constants/request";
import { FORM_ITEM_TYPES } from "@/constants/common";
import AppDatePicker from "@/components/AppDatePicker";
import { TimePicker } from "antd";
import { CreateRequestContext } from "@/pages/request/create-request";
import {
  addCheckInRequestSchema,
  addCheckOutRequestSchema,
  addCommonRequestSchema,
  addOvertimeRequestSchema,
} from "@/schemas";
import AppFormErrorMessage from "@/components/AppFormErrorMessage";
import { createRequestOptions } from "@/utils";
import AppTimePicker from "@/components/AppTimePicker";

const { TEXTAREA, SELECT } = FORM_ITEM_TYPES;

const { MODIFY_CHECKIN, MODIFY_CHECKOUT, OVERTIME } = REQUEST_TYPES;

const FormFields = () => {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext() as any;

  const { setSchemaValidation } = useContext(CreateRequestContext) as any;

  useEffect(() => {
    let newSchema;
    switch (values.type) {
      case MODIFY_CHECKIN.value:
        newSchema = addCheckInRequestSchema;
        break;

      case MODIFY_CHECKOUT.value:
        newSchema = addCheckOutRequestSchema;
        break;

      case OVERTIME.value:
        newSchema = addOvertimeRequestSchema;
        break;

      default:
        newSchema = addCommonRequestSchema;
    }
    if (newSchema) {
      setSchemaValidation(newSchema);
    }
  }, [values.type]);

  const handleChangeTimePicker =
    (field: string) => (time: any, timeString: string) => {
      // if (time) {
      //   setFieldTouched(field, false);
      // }
      setFieldValue(field, time);
    };

  const TimeComponent = useMemo(() => {
    switch (values.type) {
      case MODIFY_CHECKIN.value:
        return (
          <AppTimePicker
            onChange={handleChangeTimePicker("startTime")}
            value={values.startTime}
            name="startTime"
            label="Time"
            error={errors.startTime}
            // onBlur={() => setFieldTouched("startTime", true)}
          />
        );

      case MODIFY_CHECKOUT.value:
        return (
          <AppTimePicker
            onChange={handleChangeTimePicker("endTime")}
            value={values.endTime}
            label="Time"
            name="endTime"
            error={errors.endTime}
          />
        );

      case OVERTIME.value:
        return (
          <div className="grouptime">
            <AppTimePicker
              onChange={handleChangeTimePicker("startTime")}
              value={values.startTime}
              label="From"
              name="startTime"
              error={errors.startTime}
            />
            <AppTimePicker
              onChange={handleChangeTimePicker("endTime")}
              value={values.endTime}
              label="To"
              name="endTime"
              error={errors.endTime}
            />
          </div>
        );
      default:
        return null;
    }
  }, [values, errors, touched]);

  const handleDatePickerChange = (newDate: any) => {
    setFieldValue("date", newDate);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="type"
        label="Request Type"
        value={values.type}
        type={SELECT}
        options={Object.values(createRequestOptions())}
        placeholder="Select request type"
      />

      {TimeComponent}

      <AppDatePicker
        value={values.date}
        onChange={handleDatePickerChange}
        error={errors.date}
      />

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
