import { FC } from "react";

import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import { IFormLoginProps } from "./interface";

// localize

const FormLogin: FC<IFormLoginProps> = ({
  initialValue,
  onSubmit,
  validationSchema,
}) => {
  return (
    <div className="form-login">
      <AppForm<typeof initialValue>
        handleSubmitForm={onSubmit}
        initialValues={initialValue}
        validationSchema={validationSchema}
        title="Login"
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default FormLogin;
