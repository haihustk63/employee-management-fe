import { FC } from "react";
import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES } from "@/constants/common";

const { TEXT, PASSWORD } = FORM_ITEM_TYPES;

const FormFields: FC<{ actor: "candidate" | "employee" }> = ({ actor }) => {
  const { values, handleChange, handleSubmit } = useFormikContext() as any;

  return (
    <Form onSubmit={handleSubmit} className="form">
      {actor === "candidate" ? (
        <FormItem
          name="username"
          label="Username"
          type={TEXT}
          onChange={handleChange}
          value={values?.username}
          placeholder="Enter your username"
        />
      ) : (
        <FormItem
          name="email"
          label="Email"
          type={TEXT}
          onChange={handleChange}
          value={values?.email}
          placeholder="Enter your email"
        />
      )}
      <FormItem
        name="password"
        label="Password"
        type={PASSWORD}
        onChange={handleChange}
        value={values?.password}
        placeholder="Enter your password"
      />

      <AppButton buttonTitle="Login" htmlType="submit" />
    </Form>
  );
};

export default FormFields;
