import { FC } from "react";

import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import { IFormLateEarlyOTProps } from "./interface";

const FormLateEarlyOT: FC<IFormLateEarlyOTProps> = ({ initialValues }) => {
  const handleSubmitForm = () => {};
  return (
    <AppForm<typeof initialValues>
      initialValues={initialValues}
      title="Being Late, Leaving Early and OT"
      handleSubmitForm={handleSubmitForm}
    >
      <FormFields />
    </AppForm>
  );
};

export default FormLateEarlyOT;
