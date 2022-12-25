import { Form, useFormikContext } from "formik";
import debounce from "lodash/debounce";
import { useContext, useEffect, useMemo, useState } from "react";

import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES, JOB_LEVELS, JOB_TYPES } from "@/constants/common";
import { useGetAllPositions } from "@/hooks/position";
import { JobManagementContext } from "@/pages/jobs";
import { dataToOptions, makeCleanObject } from "@/utils";

const { TEXT, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { data: positions = [] } = useGetAllPositions();

  const { setQueryParams, queryParams } = useContext(
    JobManagementContext
  ) as any;

  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const [isTitleChange, setIsTitleChange] = useState(false);

  const handleSetSearchParams = (field: string) => (value: any) => {
    const params = { ...queryParams, [field]: value };
    const pureParams = makeCleanObject(params);
    setQueryParams(pureParams);
  };

  useEffect(() => {
    if (isTitleChange) {
      handleSetSearchParams("title")(values.title);
      setIsTitleChange(false);
    }
  }, [isTitleChange]);

  const handleSetTitleChange = () => {
    setIsTitleChange(true);
  };

  const debounceSetTitleParams = useMemo(
    () => debounce(handleSetTitleChange, 500),
    []
  );

  useEffect(() => {
    return () => {
      debounceSetTitleParams.cancel();
    };
  }, []);

  const handleChangeTitle = (e: any) => {
    handleChange(e);
    debounceSetTitleParams();
  };

  const handleChangeOtherValue = (field: string) => (value: string) => {
    setFieldValue(field, value);
    handleSetSearchParams(field)(value);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="title"
        type={TEXT}
        onChange={handleChangeTitle}
        placeholder="Title"
      />
      <FormItem
        name="typeOfJob"
        value={values.typeOfJob}
        type={SELECT}
        options={dataToOptions(JOB_TYPES)}
        onChange={handleChangeOtherValue("typeOfJob")}
        placeholder="Select type of job"
      />

      <FormItem
        name="level"
        value={values.level}
        type={SELECT}
        options={dataToOptions(JOB_LEVELS)}
        onChange={handleChangeOtherValue("level")}
        placeholder="Select level"
      />

      <FormItem
        name="positionId"
        value={values.positionId}
        type={SELECT}
        options={dataToOptions(positions)}
        placeholder="Select position"
        onChange={handleChangeOtherValue("positionId")}
      />
    </Form>
  );
};

export default FormFields;
