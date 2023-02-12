import { Form, useFormikContext } from "formik";
import { FC, useContext } from "react";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES } from "@/constants/common";
import { LoginContext } from "@/pages/login";
import { Space, Typography } from "antd";
import GoogleIcon from "@/components/Icons/GoogleIcon";

const { TEXT, PASSWORD } = FORM_ITEM_TYPES;

const FormFields: FC = () => {
  const { loginWithGoogle } = useContext(LoginContext) as any;
  const { values, handleChange, handleSubmit } = useFormikContext() as any;

  const buttonLoginGoogleTitle = (
    <div className="wrapper">
      <GoogleIcon />
      <Typography.Text>Login with google</Typography.Text>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="email"
        label="Email"
        type={TEXT}
        onChange={handleChange}
        value={values?.email}
        placeholder="Enter your email"
      />
      <FormItem
        name="password"
        label="Password"
        type={PASSWORD}
        onChange={handleChange}
        value={values?.password}
        placeholder="Enter your password"
      />

      <AppButton buttonTitle="Login" htmlType="submit" />
      <AppButton
        buttonTitle={buttonLoginGoogleTitle}
        onClick={loginWithGoogle}
        className="-google"
      />
    </Form>
  );
};

export default FormFields;
