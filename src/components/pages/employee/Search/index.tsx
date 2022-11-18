import moment from "moment";
import { FC } from "react";

import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import { ISearchEmployeeProps } from "./interface";

const initialValues: ISearchEmployeeProps = {
  keyword: "",
  delivery: undefined,
  position: undefined,
  joinDate: moment(Date.now()),
  role: undefined,
  workingStatus: undefined,
};

const Search: FC = () => {
  const handleSubmitForm = () => {};
  return (
    <div className="employee-search">
      <AppForm<ISearchEmployeeProps>
        initialValues={initialValues}
        handleSubmitForm={handleSubmitForm}
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default Search;
