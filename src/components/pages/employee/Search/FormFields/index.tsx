import { Form, useFormikContext } from "formik";
import { useContext } from "react";

import AppDatePicker from "@/components/AppDatePicker";
import FormItem from "@/components/FormItem";
import { APP_ROLES, FORM_ITEM_TYPES, WORKING_STATUS } from "@/constants/common";
import { useGetAllDeliveries } from "@/hooks/delivery";
import { useGetAllPositions } from "@/hooks/position";
import { useSearchForm } from "@/hooks/useSearchForm";
import { EmployeeManagementContext } from "@/pages/employee";
import { dataToOptions } from "@/utils";

const { TEXT, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { data: deliveries = [] } = useGetAllDeliveries();
  const { data: positions = [] } = useGetAllPositions();

  const { queryParams, setQueryParams, resetPageParams } = useContext(
    EmployeeManagementContext
  ) as any;

  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const { handleChangeKeyword, handleChangeOtherValue } = useSearchForm({
    queryParams,
    values,
    setQueryParams,
    handleChange,
    resetPageParams,
    setFieldValue,
  });

  return (
    <Form onSubmit={handleSubmit} className="form">
      <div className="part">
        <FormItem
          name="keyword"
          label="Keyword"
          value={values.keyword}
          type={TEXT}
          placeholder="Keywords: name, email, phone"
          onChange={handleChangeKeyword}
        />
        <FormItem
          name="delivery"
          label="Delivery"
          value={values.delivery}
          type={SELECT}
          options={dataToOptions(deliveries)}
          placeholder="Select delivery"
          allowClear
          onChange={handleChangeOtherValue("delivery")}
        />
        <FormItem
          name="position"
          label="Position"
          value={values.position}
          type={SELECT}
          options={dataToOptions(positions)}
          placeholder="Select position"
          allowClear
          onChange={handleChangeOtherValue("position")}
        />
      </div>
      <div className="part">
        <FormItem
          name="role"
          label="Role"
          value={values.role}
          type={SELECT}
          options={Object.values(APP_ROLES)}
          placeholder="Select Role"
          allowClear
          onChange={handleChangeOtherValue("role")}
        />
        <FormItem
          name="workingStatus"
          label="Working Status"
          value={values.workingStatus}
          type={SELECT}
          options={Object.values(WORKING_STATUS)}
          placeholder="Select Working Status"
          allowClear
          onChange={handleChangeOtherValue("workingStatus")}
        />
      </div>
    </Form>
  );
};

export default FormFields;
