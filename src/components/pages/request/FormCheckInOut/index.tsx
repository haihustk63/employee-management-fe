import { FC } from "react";
import FormCommon from "../FormCommon";

import FormFields from "./FormFields";
import { iFormCheckInOutProps } from "./interface";

const FormCheckInOut: FC<iFormCheckInOutProps> = ({ initialValues }) => {
  const handleSubmitForm = () => {};

  return (
    <FormCommon<typeof initialValues>
      title="Check In, Out"
      handleSubmitForm={handleSubmitForm}
      initialValues={initialValues}
    >
      <FormFields />
    </FormCommon>
  );
};

export default FormCheckInOut;
