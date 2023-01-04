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

const { TEXTAREA, SELECT } = FORM_ITEM_TYPES;

const {
  MODIFY_CHECKIN,
  MODIFY_CHECKOUT,
  OVERTIME,
  // ANNUAL_LEAVE,
  // ANNUAL_AFTERNOON_LEAVE,
  // ANNUAL_MORNING_LEAVE,
  // REMOTE,
  // REMOTE_AFTERNOON,
  // REMOTE_MORNING,
  // UNPAID_LEAVE,
  // UNPAID_AFTERNOON_LEAVE,
  // UNPAID_MORNING_LEAVE,
} = REQUEST_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange, setFieldValue, errors } =
    useFormikContext() as any;

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
      setFieldValue(field, time);
    };

  const TimeComponent = useMemo(() => {
    switch (values.type) {
      case MODIFY_CHECKIN.value:
        return (
          <TimePicker
            format="HH:mm"
            onChange={handleChangeTimePicker("startTime")}
            placeholder="Choose time"
            value={values.startTime}
          />
        );

      case MODIFY_CHECKOUT.value:
        return (
          <TimePicker
            format="HH:mm"
            onChange={handleChangeTimePicker("endTime")}
            placeholder="Choose time"
            value={values.endTime}
          />
        );

      case OVERTIME.value:
        return (
          <div>
            <TimePicker
              format="HH:mm"
              onChange={handleChangeTimePicker("startTime")}
              placeholder="Choose start time"
              value={values.startTime}
            />
            <TimePicker
              format="HH:mm"
              onChange={handleChangeTimePicker("endTime")}
              placeholder="Choose end time"
              value={values.endTime}
            />
          </div>
        );
      default:
        return null;
    }
  }, [values]);

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
      {errors.startTime ? (
        <AppFormErrorMessage message={errors.startTime} />
      ) : null}
      {errors.endTime ? <AppFormErrorMessage message={errors.endTime} /> : null}

      <AppDatePicker value={values.date} onChange={handleDatePickerChange} />
      {errors.date ? <AppFormErrorMessage message={errors.date} /> : null}

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
