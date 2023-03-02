import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES } from "@/constants/common";
import { useGetEmployees } from "@/hooks/employee";
import { dataToOptions, mergeName } from "@/utils";
import { useContext, useMemo, useState } from "react";
import { AccountManagementContext } from "@/pages/account";
import { useGetCandidateProfile } from "@/hooks/candidate";
import { Alert, Switch, Typography } from "antd";

const { Text } = Typography;

const { TEXT, PASSWORD, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange, resetForm } =
    useFormikContext() as any;

  const { data: employees = {} } = useGetEmployees() as any;
  const { data: candidates = {} } = useGetCandidateProfile() as any;

  const candidateOptions = useMemo(() => {
    return dataToOptions(
      candidates.data
        ?.filter((candidate: any) => !candidate.employeeAccount)
        .map((candidate: any) => ({
          value: candidate.id,
          label: `${candidate.name} (${candidate.email})`,
        }))
    );
  }, [candidates]);

  const employeeOptions = useMemo(() => {
    return dataToOptions(
      employees.data
        ?.filter((employee: any) => !employee.employeeAccount)
        .map((employee: any) => ({
          value: employee.id,
          label: mergeName(employee),
        }))
    );
  }, [employees]);

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
      <div className="form-item">
        <Text className="form-label">
          Assign {switchOn ? "Employee" : "Candidate"}
        </Text>
        <Switch checked={switchOn} onChange={toggleSwitch} />
      </div>
      {switchOn ? (
        <FormItem
          name="employeeId"
          label="Employee"
          value={values.employeeId}
          type={SELECT}
          options={employeeOptions}
          placeholder="Choose a employee"
        />
      ) : (
        <>
          <Alert
            message="Assign this account to a candidate"
            description="Select a candidate so that we can send he/she an email."
          />
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
