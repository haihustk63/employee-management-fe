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
  placeholder?: string;
}> = ({ queryParams, placeholder, setQueryParams, resetPageParams }) => {
  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const { handleChangeKeyword } = useSearchForm({
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
        placeholder={placeholder ?? "Keywords: name, email, phone"}
        onChange={handleChangeKeyword}
      />
    </Form>
  );
};

export default FormFields;
