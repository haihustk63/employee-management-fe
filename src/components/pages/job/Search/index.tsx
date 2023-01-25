import { FC, useContext, useEffect, useRef } from "react";

import AppForm from "@/components/AppForm";
import { JobManagementContext } from "@/pages/jobs";
import { makeCleanObject } from "@/utils";
import FormFields from "./FormFields";
import { ISearchJobProps } from "./interface";

const initialValues: ISearchJobProps = {
  title: "",
  typeOfJob: undefined,
  level: undefined,
  positionId: undefined,
};

const Search: FC = () => {
  const { searchParams, isInit, setIsInit, setQueryParams } = useContext(
    JobManagementContext
  ) as any;

  const formRef = useRef() as any;

  useEffect(() => {
    if (searchParams.toString() && !isInit) {
      const title = searchParams.get("title");
      const typeOfJob = searchParams.get("typeOfJob");
      const level = searchParams.get("level");
      const positionId = searchParams.get("positionId");

      formRef?.current?.setFieldValue("title", title);
      if (typeOfJob !== undefined && typeOfJob !== null) {
        formRef?.current?.setFieldValue("typeOfJob", Number(typeOfJob));
      }
      if (level !== undefined && level !== null) {
        formRef?.current?.setFieldValue("level", Number(level));
      }
      if (positionId !== undefined && positionId !== null) {
        formRef?.current?.setFieldValue("positionId", Number(positionId));
      }

      const params = { title, typeOfJob, level, positionId };
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
