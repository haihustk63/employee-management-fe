import { FC, useContext, useEffect, useRef } from "react";

import AppForm from "@/components/AppForm";
import { makeCleanObject } from "@/utils";
import FormFields from "./FormFields";
import { ISearchRequestProps } from "./interface";

import { RequestManagementContext } from "@/pages/request";

const initialValues: ISearchRequestProps = {
  keyword: "",
  status: undefined,
  type: undefined,
};

const Search: FC = () => {
  const {
    searchParams = {},
    isInit,
    queryParams = {},
    setIsInit,
    setQueryParams,
  } = useContext(RequestManagementContext) as any;

  const formRef = useRef() as any;

  useEffect(() => {
    if (searchParams.toString() && !isInit) {
      const keyword = searchParams.get("keyword");
      const type = searchParams.get("type");
      const status = searchParams.get("status");

      formRef?.current?.setFieldValue("keyword", keyword);
      formRef?.current?.setFieldValue("type", +type || null);
      formRef?.current?.setFieldValue("status", +status || null);

      const params = { keyword, type, status };
      const pureParams = makeCleanObject(params);
      setQueryParams({ ...queryParams, ...pureParams });

      setIsInit(true);
    }
  }, [queryParams, searchParams, isInit]);

  const handleSubmitForm = () => {};
  return (
    <div className="request-search">
      <AppForm<ISearchRequestProps>
        initialValues={initialValues}
        handleSubmitForm={handleSubmitForm}
        innerRef={formRef}
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default Search;
