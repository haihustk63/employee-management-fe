import { FC, useContext, useEffect, useRef } from "react";

import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import { ISearchEmployeeProps } from "./interface";
import { EmployeeManagementContext } from "@/pages/employee";

import { dayjs } from "@/dayjs-config";

const initialValues: ISearchEmployeeProps = {
  keyword: "",
  delivery: undefined,
  position: undefined,
  joinDate: dayjs(Date.now()),
  role: undefined,
  workingStatus: undefined,
};

const Search: FC = () => {
  const { params = {} } = useContext(EmployeeManagementContext) as any;

  const formRef = useRef() as any;

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      if (params.delivery) {
        formRef?.current?.setFieldValue("delivery", Number(params.delivery));
      }
      formRef?.current?.setFieldValue("keyword", params.keyword);
      formRef?.current?.setFieldValue("position", params.position);
      formRef?.current?.setFieldValue("role", params.role);
      formRef?.current?.setFieldValue("workingStatus", params.workingStatus);
      formRef?.current?.setFieldValue("joinDate", params.joinDate);
    }
  }, [params]);

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
