import moment from "moment";
import { FC, useContext, useEffect, useRef, useState } from "react";

import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import { ISearchEmployeeProps } from "./interface";
import { TestQuestionConText } from "@/pages/test-questions";

const initialValues: ISearchEmployeeProps = {
  keyword: "",
  topic: undefined,
  type: undefined,
  level: undefined,
};

const Search: FC = () => {
  const { params = {} } = useContext(TestQuestionConText) as any;
  const [isInit, setIsInit] = useState(false);

  const formRef = useRef() as any;

  useEffect(() => {
    if (Object.keys(params).length > 0 && isInit === false) {
      formRef?.current?.setFieldValue("keyword", params.keyword);
      formRef?.current?.setFieldValue("type", params.type);
      formRef?.current?.setFieldValue("level", params.level);
      if (params.topic) {
        formRef?.current?.setFieldValue("topic", Number(params.topic));
      }

      setIsInit(true);
    }
  }, [params, isInit]);

  return (
    <div className="employee-search">
      <AppForm<ISearchEmployeeProps>
        initialValues={initialValues}
        // handleSubmitForm={handleSubmitForm}
        innerRef={formRef}
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default Search;
