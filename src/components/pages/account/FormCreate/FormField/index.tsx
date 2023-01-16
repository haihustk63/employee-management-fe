import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES } from "@/constants/common";
import { useGetEmployees } from "@/hooks/employee";
import { dataToOptions } from "@/utils";
import { useContext, useMemo, useState } from "react";
import { AccountManagementContext } from "@/pages/account";
import { useGetCandidateProfile } from "@/hooks/candidate";
import { Switch, Typography } from "antd";

const { TEXT, PASSWORD, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange, resetForm } =
    useFormikContext() as any;

  const { data: employees = [] } = useGetEmployees();
  const { data: candidates = [] } = useGetCandidateProfile();

  const candidateOptions = useMemo(() => {
    return dataToOptions(
      candidates.map((candidate: any) => ({
        value: candidate.id,
        label: `${candidate.name} (${candidate.email})`,
      }))
    );
  }, [candidates]);

  const { updateEmail, switchOn, toggleSwitch } = useContext(
    AccountManagementContext
  ) as any;

  const buttonTitle = useMemo(() => {
    if (updateEmail) {
      return "Update";
    } else {
      return "Create";
    }
  }, [updateEmail]);

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="email"
        label="Email"
        value={values.email}
        type={TEXT}
        onChange={handleChange}
        placeholder="Enter email"
        disabled={!!updateEmail}
      />
      {!updateEmail && (
        <FormItem
          name="password"
          label="Password"
          value={values.password}
          type={PASSWORD}
          onChange={handleChange}
          placeholder="Your password"
        />
      )}
      <Switch checked={switchOn} onChange={toggleSwitch} />
      {switchOn ? (
        <FormItem
          name="employeeId"
          label="Employee"
          value={values.employeeId}
          type={SELECT}
          options={dataToOptions(employees)}
          placeholder="Choose a employee"
        />
      ) : (
        <>
          <Typography.Text>
            Select candidate so that we can send he/she an email
          </Typography.Text>
          <FormItem
            name="candidateId"
            label="Candidate"
            value={values.candidateId}
            type={SELECT}
            options={candidateOptions}
            placeholder="Choose a candidate"
          />
        </>
      )}

      <AppButton buttonTitle={buttonTitle} htmlType="submit" />
    </Form>
  );
};

export default FormFields;
