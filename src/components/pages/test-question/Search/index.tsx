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
  const {
    searchParams,
    queryParams = {},
    isInit,
    setIsInit,
    setQueryParams,
  } = useContext(TestQuestionConText) as any;

  const formRef = useRef() as any;

  useEffect(() => {
    if (searchParams.toString() && !isInit) {
      const keyword = searchParams.get("keyword");
      const type = searchParams.get("type");
      const level = searchParams.get("level");
      const topic = searchParams.get("topic");

      formRef?.current?.setFieldValue("keyword", keyword);
      formRef?.current?.setFieldValue("type", parseInt(type) || null);
      formRef?.current?.setFieldValue("level", parseInt(level) || null);
      formRef?.current?.setFieldValue("topic", parseInt(topic) || null);

      const params = { keyword, type, level, topic };
      const pureParams = makeCleanObject(params);
      setQueryParams({ ...queryParams, ...pureParams });
    }
    setIsInit(true);
  }, [queryParams, searchParams, isInit]);

  return (
    <div className="question-search">
      <AppForm<ISearchQuestionProps>
        initialValues={initialValues}
        className="-horizontal"
        innerRef={formRef}
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default Search;
