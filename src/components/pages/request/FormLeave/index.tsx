import { FC } from "react";

import FormCommon from "@/components/AppForm";
import FormFields from "./FormFields";
import { IFormLeaveProps } from "./interface";

const FormLeave: FC<IFormLeaveProps> = ({ initialValues }) => {
  const handleSubmitForm = () => {};

  return (
    <FormCommon<typeof initialValues>
      title="Leave Application"
      handleSubmitForm={handleSubmitForm}
      initialValues={initialValues}
    >
      <FormFields />
    </FormCommon>
  );
};

export default FormLeave;
