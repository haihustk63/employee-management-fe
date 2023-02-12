import { FC, useContext, useEffect, useRef } from "react";

import AppForm from "@/components/AppForm";
import { JobManagementContext } from "@/pages/jobs";
import { makeCleanObject } from "@/utils";
import FormFields from "./FormFields";
import { ISearchJobProps } from "./interface";

const initialValues: ISearchJobProps = {
  keyword: "",
  typeOfJob: undefined,
  level: undefined,
  position: undefined,
};

const Search: FC = () => {
  const { searchParams, isInit, setIsInit, setQueryParams } = useContext(
    JobManagementContext
  ) as any;

  const formRef = useRef() as any;

  useEffect(() => {
    if (searchParams.toString() && !isInit) {
      const keyword = searchParams.get("keyword");
      const typeOfJob = searchParams.get("typeOfJob");
      const level = searchParams.get("level");
      const position = searchParams.get("position");

      formRef?.current?.setFieldValue("keyword", keyword);
      if (typeOfJob !== undefined && typeOfJob !== null) {
        formRef?.current?.setFieldValue("typeOfJob", +typeOfJob || null);
      }
      if (level !== undefined && level !== null) {
        formRef?.current?.setFieldValue("level", +level || null);
      }
      if (position !== undefined && position !== null) {
        formRef?.current?.setFieldValue("position", +position || null);
      }

      const params = { keyword, typeOfJob, level, position };
      const pureParams = makeCleanObject(params);
      setQueryParams(pureParams);
    }
    setIsInit(true);
  }, [searchParams, isInit]);

  return (
    <div className="job-search">
      <AppForm<ISearchJobProps>
        initialValues={initialValues}
        innerRef={formRef}
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default Search;
