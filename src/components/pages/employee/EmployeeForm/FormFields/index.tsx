import { FC } from "react";
import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import AppDatePicker from "@/components/AppDatePicker";
import { useGetAllPositions } from "@/hooks/position";
import { dataToOptions } from "@/utils";
import { useGetAllDeliveries } from "@/hooks/delivery";
import {
  BASIC_ROLES,
  FORM_ITEM_TYPES,
  WORKING_STATUS,
} from "@/constants/common";

const { TEXT, SELECT, INPUT_NUMBER } = FORM_ITEM_TYPES;

const FormFields: FC = () => {
  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const { data: positions = [] } = useGetAllPositions();
  const { data: deliveries = [] } = useGetAllDeliveries();

  const handleDateOfBirthChange = (newDate: any) => {
    setFieldValue("dateOfBirth", newDate);
  };

  const handleJoinDateChange = (newDate: any) => {
    setFieldValue("joinDate", newDate);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="firstName"
        label="First Name"
        value={values.firstName}
        type={TEXT}
        onChange={handleChange}
        placeholder="Enter first name"
      />
      <FormItem
        name="middleName"
        label="Middle Name"
        value={values.middleName}
        type={TEXT}
        onChange={handleChange}
        placeholder="Enter middle name"
      />
      <FormItem
        name="lastName"
        label="Last Name"
        value={values.lastName}
        type={TEXT}
        onChange={handleChange}
        placeholder="Enter last name"
      />
      <FormItem
        name="phoneNumber"
        label="Phone Number"
        value={values.phoneNumber}
        type={TEXT}
        onChange={handleChange}
        placeholder="Enter phone number"
      />
      <AppDatePicker
        value={values.dateOfBirth}
        pickerLabel="Date Of Birth"
        onChange={handleDateOfBirthChange}
      />
      <FormItem
        name="delivery"
        label="Delivery"
        value={values.deliveryId}
        type={SELECT}
        options={dataToOptions(deliveries)}
        placeholder="Choose delivery"
      />
      <FormItem
        name="position"
        label="Position"
        value={values.positionId}
        type={SELECT}
        options={dataToOptions(positions)}
        placeholder="Choose position"
      />
      <FormItem
        name="workingStatus"
        label="Working Status"
        value={values.workingStatus}
        type={SELECT}
        options={WORKING_STATUS}
        placeholder="Choose workingStatus"
      />
      <AppDatePicker
        value={values.joinDate}
        pickerLabel="Join Date"
        onChange={handleJoinDateChange}
      />
      <FormItem
        name="role"
        label="Role"
        value={values.role}
        type={SELECT}
        options={BASIC_ROLES}
        placeholder="Choose role"
      />
      <FormItem
        name="paidLeaveCount"
        label="Paid Leave Count"
        value={values.paidLeaveCount}
        type={INPUT_NUMBER}
        min={0}
        max={12}
        placeholder="Enter paid leave count"
      />
      <AppButton buttonTitle="Add" htmlType="submit" />
    </Form>
  );
};

export default FormFields;
