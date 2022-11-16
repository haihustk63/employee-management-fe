import React, { FC } from "react";
import FormCommon from "../FormCommon";
import FormFields from "./FormFields";
import { IFormLateEarlyOTProps } from "./interface";

const FormLateEarlyOT: FC<IFormLateEarlyOTProps> = ({ initialValues }) => {
  const handleSubmitForm = () => {};
  return (
    <FormCommon<typeof initialValues>
      initialValues={initialValues}
      title="Being Late, Leaving Early and OT"
      handleSubmitForm={handleSubmitForm}
    >
      <FormFields />
    </FormCommon>
  );
};

export default FormLateEarlyOT;
