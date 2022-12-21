import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES } from "@/constants/common";
import { useGetCandidateProfile } from "@/hooks/candidate";
import { dataToOptions } from "@/utils";

const { TEXT, PASSWORD, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;
  const { data = [] } = useGetCandidateProfile();

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="username"
        label="Username"
        value={values.username}
        type={TEXT}
        onChange={handleChange}
        placeholder="Enter username"
      />
      <FormItem
        name="password"
        label="Password"
        value={values.password}
        type={PASSWORD}
        onChange={handleChange}
        placeholder="Your password"
      />
      <FormItem
        name="candidateId"
        label="Candidate"
        value={values.candidateId}
        type={SELECT}
        options={dataToOptions(data)}
        placeholder="Choose a candidate"
      />

      <AppButton buttonTitle="Create" htmlType="submit" />
    </Form>
  );
};

export default FormFields;
