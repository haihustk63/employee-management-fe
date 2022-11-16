import { FC } from "react";

import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import { iFormCheckInOutProps } from "./interface";

const FormCheckInOut: FC<iFormCheckInOutProps> = ({ initialValues }) => {
  const handleSubmitForm = () => {};

  return (
    <AppForm<typeof initialValues>
      title="Check In, Out"
      handleSubmitForm={handleSubmitForm}
      initialValues={initialValues}
    >
      <FormFields />
    </AppForm>
  );
};

export default FormCheckInOut;
