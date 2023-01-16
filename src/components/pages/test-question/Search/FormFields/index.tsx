import { Form, useFormikContext } from "formik";
import { useContext, useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";

import FormItem from "@/components/FormItem";
import {
  COMMON_TYPE_QUESTION,
  FORM_ITEM_TYPES,
  QUESTION_LEVELS,
} from "@/constants/common";
import { dataToOptions, makeCleanObject } from "@/utils";
import { TestQuestionConText } from "@/pages/test-questions";
import { useGetConstantTestQuestionValue } from "@/hooks/constant";
import { useGetAllTestTopics } from "@/hooks/test-topic";

const { TEXT, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { data: testTopics = [] } = useGetAllTestTopics();

  const { setQueryParams, queryParams } = useContext(
    TestQuestionConText
  ) as any;

  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const [isKeywordChange, setIsKeywordChange] = useState(false);

  const handleSetSearchParams = (field: string) => (value: any) => {
    const params = { ...queryParams, [field]: value };
    const pureParams = makeCleanObject(params);
    setQueryParams(pureParams);
  };

  useEffect(() => {
    if (isKeywordChange) {
      handleSetSearchParams("keyword")(values.keyword);
      setIsKeywordChange(false);
    }
  }, [isKeywordChange]);

  const handleSetKeywordChange = () => {
    setIsKeywordChange(true);
  };

  const debounceSetKeywordParams = useMemo(
    () => debounce(handleSetKeywordChange, 500),
    []
  );

  useEffect(() => {
    return () => {
      debounceSetKeywordParams.cancel();
    };
  }, []);

  const handleChangeKeyword = (e: any) => {
    handleChange(e);
    debounceSetKeywordParams();
  };

  const handleChangeOtherValue = (field: string) => (value: string) => {
    setFieldValue(field, value);
    handleSetSearchParams(field)(value);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="keyword"
        type={TEXT}
        onChange={handleChangeKeyword}
        placeholder="Keywords"
      />
      <FormItem
        name="topic"
        value={values.topic}
        type={SELECT}
        options={dataToOptions(testTopics)}
        onChange={handleChangeOtherValue("topic")}
        placeholder="Select topic"
      />
      <FormItem
        name="type"
        value={values.type}
        type={SELECT}
        options={Object.values(COMMON_TYPE_QUESTION)}
        placeholder="Select type"
        onChange={handleChangeOtherValue("type")}
      />
      <FormItem
        name="level"
        value={values.level}
        type={SELECT}
        options={Object.values(QUESTION_LEVELS)}
        onChange={handleChangeOtherValue("level")}
        placeholder="Select level"
      />
    </Form>
  );
};

export default FormFields;
