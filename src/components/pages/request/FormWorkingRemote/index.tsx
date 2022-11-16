import { FC } from "react";

import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import { IFormWorkingRemoteProps } from "./interface";

const FormWorkingRemote: FC<IFormWorkingRemoteProps> = ({ initialValues }) => {
  const handleSubmitForm = () => {};

  return (
    <AppForm<typeof initialValues>
      title="Working Remote"
      handleSubmitForm={handleSubmitForm}
      initialValues={initialValues}
    >
      <FormFields />
    </AppForm>
  );
};

export default FormWorkingRemote;
