import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES, MANAGER_EXAMPLE } from "@/constants/common";
import { FC } from "react";
import AppDatePicker from "@/components/AppDatePicker";

const { TEXT, SELECT } = FORM_ITEM_TYPES;

const FormFields: FC = () => {
  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const handleDateOfBirthChange = (newDate: any) => {
    setFieldValue("dateOfBirth", newDate);
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
        name="position"
        label="Position"
        value={values.position}
        type={SELECT}
        options={MANAGER_EXAMPLE}
        onChange={handleChange}
        placeholder="Choose position"
      />
      <FormItem
        name="role"
        label="Role"
        value={values.role}
        type={SELECT}
        options={MANAGER_EXAMPLE}
        onChange={handleChange}
        placeholder="Choose role"
      />
      <AppButton buttonTitle="Add" htmlType="submit" />
    </Form>
  );
};

export default FormFields;
