import { FC } from "react";
import FormCommon from "../FormCommon";
import FormFields from "./FormFields";
import { IFormWorkingRemoteProps } from "./interface";

const FormWorkingRemote: FC<IFormWorkingRemoteProps> = ({ initialValues }) => {
  const handleSubmitForm = () => {};

  return (
    <FormCommon<typeof initialValues>
      title="Working Remote"
      handleSubmitForm={handleSubmitForm}
      initialValues={initialValues}
    >
      <FormFields />
    </FormCommon>
  );
};

export default FormWorkingRemote;
