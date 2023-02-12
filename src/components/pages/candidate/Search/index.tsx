import { FC, useContext, useEffect, useRef } from "react";

import AppForm from "@/components/AppForm";
import { CandidateProfileContext } from "@/pages/candidate";
import { makeCleanObject } from "@/utils";
import FormFields from "./FormFields";
import { ISearchCandidateProps } from "./interface";

const initialValues: ISearchCandidateProps = {
  keyword: "",
  assessment: undefined,
};

const Search: FC = () => {
  const {
    searchParams = {},
    isInit,
    queryParams = {},
    setIsInit,
    setQueryParams,
  } = useContext(CandidateProfileContext) as any;

  const formRef = useRef() as any;

  useEffect(() => {
    if (searchParams.toString() && !isInit) {
      const keyword = searchParams.get("keyword");
      const assessment = searchParams.get("assessment");

      formRef?.current?.setFieldValue("keyword", keyword);
      formRef?.current?.setFieldValue(
        "assessment",
        parseInt(assessment) || null
      );

      const params = { keyword, assessment };
      const pureParams = makeCleanObject(params);
      setQueryParams({ ...queryParams, ...pureParams });

      setIsInit(true);
    }
  }, [queryParams, searchParams, isInit]);

  const handleSubmitForm = () => {};
  return (
    <div className="employee-search">
      <AppForm<ISearchCandidateProps>
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
