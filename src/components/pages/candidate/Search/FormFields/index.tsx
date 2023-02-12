import { Form, useFormikContext } from "formik";
import { useContext } from "react";

import FormItem from "@/components/FormItem";
import { ASSESSMENT, FORM_ITEM_TYPES } from "@/constants/common";
import { useSearchForm } from "@/hooks/useSearchForm";
import { CandidateProfileContext } from "@/pages/candidate";
import { dataToOptions } from "@/utils";

const { TEXT, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { queryParams, setQueryParams, resetPageParams } = useContext(
    CandidateProfileContext
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
    <Form onSubmit={handleSubmit} className="form -horizontal">
      <FormItem
        name="keyword"
        label="Keyword"
        value={values.keyword}
        type={TEXT}
        placeholder="Keywords: name, email, phone"
        onChange={handleChangeKeyword}
      />
      <FormItem
        name="assessment"
        label="Assessment"
        value={values.assessment}
        type={SELECT}
        options={dataToOptions(ASSESSMENT)}
        placeholder="Select assessment"
        allowClear
        onChange={handleChangeOtherValue("assessment")}
      />
    </Form>
  );
};

export default FormFields;
