import { Form, useFormikContext } from "formik";
import { useContext } from "react";

import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES } from "@/constants/common";
import { REQUEST_STATUS, REQUEST_TYPES } from "@/constants/request";
import { useSearchForm } from "@/hooks/useSearchForm";
import { RequestManagementContext } from "@/pages/request";

const { TEXT, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { queryParams, setQueryParams, resetPageParams } = useContext(
    RequestManagementContext
  ) as any;

  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const { handleChangeKeyword, handleChangeOtherValue } = useSearchForm({
    queryParams,
    values,
    setQueryParams,
    handleChange,
    resetPageParams,
    setFieldValue,
  });

  return (
    <Form onSubmit={handleSubmit} className="form">
      <div className="part">
        <FormItem
          name="keyword"
          label="Keyword"
          value={values.keyword}
          type={TEXT}
          placeholder="Enter keyword"
          onChange={handleChangeKeyword}
        />
        <FormItem
          name="type"
          label="Type"
          value={values.type}
          type={SELECT}
          options={Object.values(REQUEST_TYPES)}
          placeholder="Select type"
          allowClear
          onChange={handleChangeOtherValue("type")}
        />
        <FormItem
          name="status"
          label="Status"
          value={values.status}
          type={SELECT}
          options={Object.values(REQUEST_STATUS)}
          placeholder="Select status"
          allowClear
          onChange={handleChangeOtherValue("status")}
        />
      </div>
    </Form>
  );
};

export default FormFields;
