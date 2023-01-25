import { FC, useContext, useEffect, useRef, useState } from "react";

import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import { TestQuestionConText } from "@/pages/test-questions";
import { makeCleanObject } from "@/utils";
import { ISearchQuestionProps } from "./interface";

const initialValues: ISearchQuestionProps = {
  keyword: "",
  topic: undefined,
  type: undefined,
  level: undefined,
};

const Search: FC = () => {
  const { searchParams, isInit, setIsInit, setQueryParams } = useContext(
    TestQuestionConText
  ) as any;

  const formRef = useRef() as any;

  useEffect(() => {
    if (searchParams.toString() && !isInit) {
      const keyword = searchParams.get("keyword");
      const type = searchParams.get("type");
      const level = searchParams.get("level");
      const topic = searchParams.get("topic");

      formRef?.current?.setFieldValue("keyword", keyword);
      formRef?.current?.setFieldValue("type", type);
      formRef?.current?.setFieldValue("level", level);
      if (topic !== null && topic !== undefined) {
        formRef?.current?.setFieldValue("topic", Number(topic));
      }

      const params = { keyword, type, level, topic };
      const pureParams = makeCleanObject(params);
      setQueryParams(pureParams);
    }
    setIsInit(true);
  }, [searchParams, isInit]);

  return (
    <div className="question-search">
      <AppForm<ISearchQuestionProps>
        initialValues={initialValues}
        className="-horizontal"
        // handleSubmitForm={handleSubmitForm}
        innerRef={formRef}
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default Search;
