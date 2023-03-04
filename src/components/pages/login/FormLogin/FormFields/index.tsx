import { Form, useFormikContext } from "formik";
import { FC, useContext } from "react";

import AppButton from "@/components/AppButton";
import appNotification from "@/components/AppNotification";
import FormItem from "@/components/FormItem";
import GoogleIcon from "@/components/Icons/GoogleIcon";
import { FORM_ITEM_TYPES } from "@/constants/common";
import { LoginContext } from "@/pages/login";
import { Typography } from "antd";

const { TEXT, PASSWORD } = FORM_ITEM_TYPES;

const FormFields: FC = () => {
  const { loginWithGoogle, onForgotPassword } = useContext(LoginContext) as any;
  const { values, handleChange, handleSubmit } = useFormikContext() as any;

  const buttonLoginGoogleTitle = (
    <div className="wrapper">
      <GoogleIcon />
      <Typography.Text>Login with google</Typography.Text>
    </div>
  );

  const handleForgotPassword = () => {
    if (!values.email) {
      appNotification({
        message: "Forgot Password",
        description: "Please enter your email",
        type: "error",
      });
      return;
    }

    onForgotPassword({ email: values.email });
  };

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
      {/* <AppButton
        buttonTitle="Forgot password?"
        className="-danger"
        onClick={handleForgotPassword}
      /> */}
    </Form>
  );
};

export default FormFields;
