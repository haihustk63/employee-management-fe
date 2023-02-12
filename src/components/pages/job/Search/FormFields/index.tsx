import { Form, useFormikContext } from "formik";
import { useContext } from "react";

import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES, JOB_LEVELS, JOB_TYPES } from "@/constants/common";
import { useGetAllPositions } from "@/hooks/position";
import { useSearchForm } from "@/hooks/useSearchForm";
import { JobManagementContext } from "@/pages/jobs";
import { dataToOptions } from "@/utils";

const { TEXT, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { data: positions = [] } = useGetAllPositions();

  const { resetPageParams, queryParams, setQueryParams } = useContext(
    JobManagementContext
  ) as any;

  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const { handleChangeKeyword, handleChangeOtherValue } = useSearchForm({
    queryParams,
    resetPageParams,
    values,
    setQueryParams,
    handleChange,
    setFieldValue,
  });
  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="keyword"
        label="Keyword"
        type={TEXT}
        onChange={handleChangeKeyword}
        placeholder="Enter keyword: Job title"
      />
      <FormItem
        name="typeOfJob"
        label="Job Type"
        value={values.typeOfJob}
        type={SELECT}
        allowClear
        options={dataToOptions(JOB_TYPES)}
        onChange={handleChangeOtherValue("typeOfJob")}
        placeholder="Select type of job"
      />

      <FormItem
        name="level"
        label="Job Level"
        value={values.level}
        allowClear
        type={SELECT}
        options={dataToOptions(JOB_LEVELS)}
        onChange={handleChangeOtherValue("level")}
        placeholder="Select level"
      />

      <FormItem
        name="position"
        label="Position"
        value={values.position}
        allowClear
        type={SELECT}
        options={dataToOptions(positions)}
        placeholder="Select position"
        onChange={handleChangeOtherValue("position")}
      />
    </Form>
  );
};

export default FormFields;
