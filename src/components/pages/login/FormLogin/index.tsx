import { FC } from "react";

import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import { IFormLoginProps } from "./interface";

// localize

const FormLogin: FC<IFormLoginProps> = ({
  initialValue,
  onSubmit,
  actor,
  validationSchema,
}) => {
  return (
    <AppForm<typeof initialValue>
      handleSubmitForm={onSubmit}
      initialValues={initialValue}
      validationSchema={validationSchema}
    >
      <FormFields actor={actor} />
    </AppForm>
  );
};

export default FormLogin;
