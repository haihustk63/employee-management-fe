import AppButton from "@/components/AppButton";
import AppForm from "@/components/AppForm";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES } from "@/constants/common";
import { useUpdatePassword } from "@/hooks/account";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { changePasswordSchema } from "@/schemas";
import { Form } from "formik";
import React from "react";

const initialValues = {
  oldPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
};

const ChangePassword = () => {
  const {
    mutate: updatePassword,
    isError,
    isSuccess,
    error,
  } = useUpdatePassword();

  useTriggerNoti({
    isError,
    isSuccess,
    error,
    messageSuccess: "Update password successfully",
  });

  const submitForm = (values: any) => {
    updatePassword({ ...values });
  };

  return (
    <div className="change-password">
      <AppForm
        title="Change password"
        initialValues={initialValues}
        validationSchema={changePasswordSchema}
        handleSubmitForm={submitForm}
      >
        {({ values, handleChange }: any) => (
          <Form className="form">
            <FormItem
              name="oldPassword"
              label="Old Password"
              value={values.oldPassword}
              type={FORM_ITEM_TYPES.PASSWORD}
              placeholder="Enter old password"
              onChange={handleChange}
            />

            <FormItem
              name="newPassword"
              label="New Password"
              value={values.newPassword}
              type={FORM_ITEM_TYPES.PASSWORD}
              placeholder="Enter new password"
              onChange={handleChange}
            />

            <FormItem
              name="newPasswordConfirm"
              label="Confirm New Password"
              value={values.newPasswordConfirm}
              type={FORM_ITEM_TYPES.PASSWORD}
              placeholder="Enter new password again"
              onChange={handleChange}
            />

            <AppButton buttonTitle="Submit" htmlType="submit" />
          </Form>
        )}
      </AppForm>
    </div>
  );
};

export default ChangePassword;
