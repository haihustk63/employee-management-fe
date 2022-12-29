import { FC } from "react";
import { Typography } from "antd";

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
    <div className="form-login">
      <Typography.Title level={1}>Login</Typography.Title>
      <AppForm<typeof initialValue>
        handleSubmitForm={onSubmit}
        initialValues={initialValue}
        validationSchema={validationSchema}
      >
        <FormFields actor={actor} />
      </AppForm>
    </div>
  );
};

export default FormLogin;
