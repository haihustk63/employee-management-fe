import { Form, Formik } from "formik";
import React, { FC } from "react";

import FormItem from "@/components/FormItem";
import { IFormLoginProps } from "./interface";
import AppButton from "@/components/AppButton";

// localize

const FormLogin: FC<IFormLoginProps> = ({ initialValue, onSubmit, actor }) => {
  return (
    <Formik initialValues={initialValue} onSubmit={onSubmit}>
      {({ handleSubmit, handleChange, values, errors, touched }) => {
        return (
          <Form onSubmit={handleSubmit} className="form-login">
            {actor === "candidate" ? (
              <FormItem
                name="username"
                label="Username"
                onChange={handleChange}
                value={values?.username}
                placeholder="Enter your username"
              />
            ) : (
              <FormItem
                name="email"
                label="Email"
                onChange={handleChange}
                value={values?.email}
                placeholder="Enter your email"
              />
            )}
            <FormItem
              name="password"
              label="Password"
              onChange={handleChange}
              value={values?.password}
              placeholder="Enter your password"
            />

            <AppButton buttonTitle="Login" htmlType="submit" />
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormLogin;
