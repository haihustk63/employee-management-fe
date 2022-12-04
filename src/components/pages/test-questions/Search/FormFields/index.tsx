import { Form, useFormikContext } from "formik";
import { useCallback, useContext, useEffect } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES, MANAGER_EXAMPLE } from "@/constants/common";
import { dataToOptions } from "@/utils";
import { TestQuestionConText } from "@/pages/test-questions";
import { useGetConstantTestQuestion } from "@/hooks/constant";
import { useGetAllTestTopics } from "@/hooks/test-topic";

const { TEXT, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const [types, levels] = useGetConstantTestQuestion() as any;
  const { data: testTopics = [] } = useGetAllTestTopics();

  const { setSearchParams, searchParams } = useContext(
    TestQuestionConText
  ) as any;

  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const setKeywordParams = (value: string) => {
    if (!value) {
      searchParams?.delete("keyword");
    } else {
      searchParams?.set("keyword", value);
    }
    setSearchParams(searchParams);
  };

  const debounceSetKeywordParams = useCallback(
    debounce(setKeywordParams, 500),
    []
  );

  const handleChangeKeyword = (e: any) => {
    handleChange(e);
    debounceSetKeywordParams(e.target.value as string);
  };

  const handleChangeOtherValue = (field: string) => (value: string) => {
    setFieldValue(field, value);
    searchParams?.set(field, value);
    setSearchParams(searchParams);
  };

  if (types.isLoading || levels.isLoading) return null;

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="keyword"
        value={values.keyword}
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
        options={dataToOptions(Object.values(types.data.types))}
        placeholder="Select type"
        onChange={handleChangeOtherValue("type")}
      />
      <FormItem
        name="level"
        value={values.level}
        type={SELECT}
        options={dataToOptions(Object.values(levels.data.levels))}
        onChange={handleChangeOtherValue("level")}
        placeholder="Select level"
      />
    </Form>
  );
};

export default FormFields;
