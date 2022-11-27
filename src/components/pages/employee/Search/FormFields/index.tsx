import { Form, useFormikContext } from "formik";
import { useCallback, useContext, useEffect } from "react";
import { debounce } from "lodash";

import AppDatePicker from "@/components/AppDatePicker";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES, MANAGER_EXAMPLE } from "@/constants/common";
import { useGetAllDeliveries } from "@/hooks/delivery";
import { dataToOptions } from "@/utils";
import { EmployeeManagementContext } from "@/pages/employee";
import { useNavigate } from "react-router-dom";

const { TEXT, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const navigate = useNavigate();
  const { data = [] } = useGetAllDeliveries();

  const { setSearchParams, searchParams } = useContext(
    EmployeeManagementContext
  ) as any;

  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  useEffect(() => {
    for (let field in values) {
      if (field === "joinDate" || field === "keyword") continue;
      if (values[field]) {
        searchParams?.set(field, values[field]);
        setSearchParams(searchParams);
      } else {
        searchParams?.delete(field);
        setSearchParams(searchParams);
      }
    }
  }, [values]);

  const handleDatePickerChange = (newDate: any) => {
    setFieldValue("joinDate", newDate);
  };

  const setKeywordParams = (value: string) => {
    if (!value) {
      searchParams?.delete("keyword");
    } else {
      searchParams?.set("keyword", value);
    }
    setSearchParams(searchParams);
  };

  const debounceSetKeywordParams = useCallback(
    debounce(setKeywordParams, 500),
    []
  );

  const handleChangeKeyword = (e: any) => {
    handleChange(e);
    debounceSetKeywordParams(e.target.value as string);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="keyword"
        value={values.keyword}
        type={TEXT}
        onChange={handleChangeKeyword}
        placeholder="Keywords: name, email, phone"
      />
      <FormItem
        name="delivery"
        value={values.delivery}
        type={SELECT}
        options={dataToOptions(data)}
        placeholder="Select delivery"
      />
      <FormItem
        name="position"
        value={values.position}
        type={SELECT}
        options={MANAGER_EXAMPLE}
        placeholder="Select position"
        onChange={handleChange}
      />
      <FormItem
        name="role"
        value={values.role}
        type={SELECT}
        options={MANAGER_EXAMPLE}
        onChange={handleChange}
        placeholder="Select role"
      />
      <FormItem
        name="workingStatus"
        value={values.workingStatus}
        type={SELECT}
        options={MANAGER_EXAMPLE}
        onChange={handleChange}
        placeholder="Select Working Status"
      />
      <AppDatePicker
        value={values.joinDate}
        onChange={handleDatePickerChange}
      />
    </Form>
  );
};

export default FormFields;
