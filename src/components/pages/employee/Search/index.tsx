import { FC, useContext, useEffect, useRef } from "react";

import AppForm from "@/components/AppForm";
import { EmployeeManagementContext } from "@/pages/employee";
import FormFields from "./FormFields";
import { ISearchEmployeeProps } from "./interface";
import { makeCleanObject } from "@/utils";

import { dayjs } from "@/dayjs-config";

const initialValues: ISearchEmployeeProps = {
  keyword: "",
  delivery: undefined,
  role: undefined,
  position: undefined,
  workingStatus: undefined,
};

const Search: FC = () => {
  const {
    searchParams = {},
    isInit,
    queryParams = {},
    setIsInit,
    setQueryParams,
  } = useContext(EmployeeManagementContext) as any;

  const formRef = useRef() as any;

  useEffect(() => {
    if (searchParams.toString() && !isInit) {
      const keyword = searchParams.get("keyword");
      const delivery = searchParams.get("delivery");
      const position = searchParams.get("position");
      const workingStatus = searchParams.get("workingStatus");
      const role = searchParams.get("role");

      formRef?.current?.setFieldValue("keyword", keyword);
      formRef?.current?.setFieldValue("delivery", parseInt(delivery) || null);
      formRef?.current?.setFieldValue("position", parseInt(position) || null);
      formRef?.current?.setFieldValue("role", parseInt(role) || null);
      formRef?.current?.setFieldValue(
        "workingStatus",
        parseInt(workingStatus) || null
      );

      const params = { keyword, delivery, position, workingStatus, role };
      const pureParams = makeCleanObject(params);
      setQueryParams({ ...queryParams, ...pureParams });

      setIsInit(true);
    }
  }, [queryParams, searchParams, isInit]);

  const handleSubmitForm = () => {};
  return (
    <div className="employee-search">
      <AppForm<ISearchEmployeeProps>
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
