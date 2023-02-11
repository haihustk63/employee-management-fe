import { FC, useEffect, useRef } from "react";

import AppForm from "@/components/AppForm";
import { makeCleanObject } from "@/utils";
import FormFields from "./FormFields";
import { IAppSearchKeywordProps } from "./interface";

const initialValues = {
  keyword: "",
};

const AppSearchKeyword: FC<IAppSearchKeywordProps> = ({
  searchParams = {},
  isInit,
  queryParams = {},
  setIsInit,
  setQueryParams,
  resetPageParams,
}) => {
  const formRef = useRef() as any;

  useEffect(() => {
    if (searchParams.toString() && !isInit) {
      const keyword = searchParams.get("keyword");

      formRef?.current?.setFieldValue("keyword", keyword);

      const params = { keyword };
      const pureParams = makeCleanObject(params);
      setQueryParams({ ...queryParams, ...pureParams });

      setIsInit(true);
    }
  }, [queryParams, searchParams, isInit]);

  const handleSubmitForm = () => {};
  return (
    <div className="employee-search">
      <AppForm
        initialValues={initialValues}
        handleSubmitForm={handleSubmitForm}
        innerRef={formRef}
      >
        <FormFields
          queryParams={queryParams}
          resetPageParams={resetPageParams}
          setQueryParams={setQueryParams}
        />
      </AppForm>
    </div>
  );
};

export default AppSearchKeyword;
