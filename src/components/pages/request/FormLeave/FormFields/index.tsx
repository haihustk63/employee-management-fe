import { useContext, useEffect, useMemo } from "react";
import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import {
  LEAVING_TIME_OPTIONS,
  REQUEST_TYPES_OPTIONS,
} from "@/constants/request";
import { FORM_ITEM_TYPES } from "@/constants/common";
import AppDatePicker from "@/components/AppDatePicker";
import { REQUEST_TYPES } from "@/constants/request";
import { TimePicker } from "antd";
import { CreateRequestContext } from "@/pages/request/create-request";
import {
  addCheckInRequestSchema,
  addCheckOutRequestSchema,
  addCommonRequestSchema,
  addLeaveAndRemoteRequestSchema,
  addOvertimeRequestSchema,
} from "@/schemas";
import AppFormErrorMessage from "@/components/AppFormErrorMessage";

const { TEXTAREA, SELECT } = FORM_ITEM_TYPES;

const {
  ANNUAL_LEAVE,
  MODIFY_CHECKIN,
  MODIFY_CHECKOUT,
  OVER_TIME,
  REMOTE,
  UNPAID_LEAVE,
} = REQUEST_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange, setFieldValue, errors } =
    useFormikContext() as any;

  const { setSchemaValidation } = useContext(CreateRequestContext) as any;

  useEffect(() => {
    let newSchema;
    switch (values.type) {
      case MODIFY_CHECKIN:
        newSchema = addCheckInRequestSchema;
        break;

      case MODIFY_CHECKOUT:
        newSchema = addCheckOutRequestSchema;
        break;

      case OVER_TIME:
        newSchema = addOvertimeRequestSchema;
        break;

      case UNPAID_LEAVE:
      case ANNUAL_LEAVE:
      case REMOTE:
        newSchema = addLeaveAndRemoteRequestSchema;
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
      case MODIFY_CHECKIN:
        return (
          <TimePicker
            format="HH:mm"
            onChange={handleChangeTimePicker("startTime")}
            placeholder="Choose time"
            value={values.startTime}
          />
        );

      case MODIFY_CHECKOUT:
        return (
          <TimePicker
            format="HH:mm"
            onChange={handleChangeTimePicker("endTime")}
            placeholder="Choose time"
            value={values.endTime}
          />
        );

      case OVER_TIME:
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
      case UNPAID_LEAVE:
      case ANNUAL_LEAVE:
      case REMOTE:
        return (
          <FormItem
            name="leavingTime"
            label="Leaving Time"
            value={values.leavingTime}
            type={SELECT}
            options={LEAVING_TIME_OPTIONS}
            placeholder="Select request leave time"
          />
        );
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
        options={REQUEST_TYPES_OPTIONS}
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
