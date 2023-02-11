import { Form, useFormikContext } from "formik";
import { FC } from "react";

import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES } from "@/constants/common";
import { useSearchForm } from "@/hooks/useSearchForm";

const { TEXT } = FORM_ITEM_TYPES;

const FormFields: FC<{
  queryParams?: any;
  setQueryParams?: any;
  resetPageParams?: any;
}> = ({ queryParams, setQueryParams, resetPageParams }) => {
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
    </Form>
  );
};

export default FormFields;
