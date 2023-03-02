import { Form, useFormikContext } from "formik";
import { useContext, useEffect, useMemo } from "react";

import AppButton from "@/components/AppButton";
import AppDatePicker from "@/components/AppDatePicker";
import AppTimePicker from "@/components/AppTimePicker";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES } from "@/constants/common";
import { REQUEST_TYPES } from "@/constants/request";
import { CreateRequestContext } from "@/pages/request/create-request";
import {
  addCheckInRequestSchema,
  addCheckOutRequestSchema,
  addCommonRequestSchema,
  addOvertimeRequestSchema,
} from "@/schemas";
import { getTimeLeavingLabel } from "@/utils";

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

  const requestOptions = useMemo(() => {
    return Object.values(REQUEST_TYPES).map((type: any) => {
      let typeLabel = type.label;
      const { timeLeaving = "" } = type;
      if (timeLeaving) {
        typeLabel +=
          " " + getTimeLeavingLabel(timeLeaving)?.toLocaleLowerCase();
      }
      return {
        ...type,
        label: typeLabel,
      };
    });
  }, []);

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

  const startTimeComponent = useMemo(() => {
    return (
      <AppTimePicker
        onChange={handleChangeTimePicker("startTime")}
        value={values.startTime}
        name="startTime"
        label="Time"
        error={errors.startTime}
        touched={touched.startTime}
        onBlur={() => setFieldTouched("startTime", true)}
      />
    );
  }, [values, errors, touched]);

  const endTimeComponent = useMemo(() => {
    return (
      <AppTimePicker
        onChange={handleChangeTimePicker("endTime")}
        value={values.endTime}
        label="Time"
        name="endTime"
        error={errors.endTime}
        touched={touched.endTime}
        onBlur={() => setFieldTouched("endTime", true)}
      />
    );
  }, [values, errors, touched]);

  const TimeComponent = useMemo(() => {
    switch (values.type) {
      case MODIFY_CHECKIN.value:
        return startTimeComponent;

      case MODIFY_CHECKOUT.value:
        return endTimeComponent;

      case OVERTIME.value:
        return (
          <div className="grouptime">
            {startTimeComponent}
            {endTimeComponent}
          </div>
        );
      default:
        return null;
    }
  }, [startTimeComponent, endTimeComponent]);

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
        options={requestOptions}
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
