import { Form, useFormikContext } from "formik";
import { useContext } from "react";

import FormItem from "@/components/FormItem";
import {
  COMMON_TYPE_QUESTION,
  FORM_ITEM_TYPES,
  QUESTION_LEVELS
} from "@/constants/common";
import { useGetAllTestTopics } from "@/hooks/test-topic";
import { useSearchForm } from "@/hooks/useSearchForm";
import { TestQuestionConText } from "@/pages/test-questions";
import { dataToOptions } from "@/utils";

const { TEXT, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { data: testTopics = [] } = useGetAllTestTopics();

  const { queryParams, setQueryParams, resetPageParams } = useContext(
    TestQuestionConText
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
        type={TEXT}
        onChange={handleChangeKeyword}
        placeholder="Keywords"
        label="Keyword"
      />
      <FormItem
        name="topic"
        value={values.topic}
        type={SELECT}
        options={dataToOptions(testTopics)}
        onChange={handleChangeOtherValue("topic")}
        placeholder="Select topic"
        label="Topic"
        allowClear
      />
      <FormItem
        name="type"
        value={values.type}
        type={SELECT}
        options={Object.values(COMMON_TYPE_QUESTION)}
        placeholder="Select type"
        onChange={handleChangeOtherValue("type")}
        label="Question type"
        allowClear
      />
      <FormItem
        name="level"
        value={values.level}
        type={SELECT}
        options={Object.values(QUESTION_LEVELS)}
        onChange={handleChangeOtherValue("level")}
        placeholder="Select level"
        label="Level"
        allowClear
      />
    </Form>
  );
};

export default FormFields;
