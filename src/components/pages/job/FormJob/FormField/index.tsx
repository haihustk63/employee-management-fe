import { Space, Typography } from "antd";
import { Form, useFormikContext } from "formik";
import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import AppButton from "@/components/AppButton";
import AppFormErrorMessage from "@/components/AppFormErrorMessage";
import AppTextEditor from "@/components/AppTextEditor";
import AppTooltip from "@/components/AppTooltip";
import FormItem from "@/components/FormItem";
import AddIcon from "@/components/Icons/AddIcon";
import { FORM_ITEM_TYPES, JOB_LEVELS, JOB_TYPES } from "@/constants/common";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { useGetJobById } from "@/hooks/job";
import { useGetAllPositions } from "@/hooks/position";
import { dataToOptions } from "@/utils";

const { TEXT, SELECT } = FORM_ITEM_TYPES;
const { Text } = Typography;

const FormFields = () => {
  const { jobId = "" } = useParams();
  const { values, handleSubmit, handleChange, setFieldValue, errors, touched } =
    useFormikContext() as any;
  const { data: positions = [] } = useGetAllPositions();
  const { data: job = {} } = useGetJobById(jobId) as any;

  useEffect(() => {
    if (Object.keys(job).length) {
      setFieldValue("title", job.title);
      setFieldValue("typeOfJob", job.typeOfJob);
      setFieldValue("upTo", job.upTo);
      setFieldValue("level", job.level);
      setFieldValue("positionId", job.positionId);
    }
  }, [job]);

  const buttonTitle = useMemo(() => {
    if (jobId !== "") {
      return "Update";
    }
    return "Create";
  }, [jobId]);

  const positionLabel = useMemo(() => {
    return (
      <Space>
        <Text className="text">Position</Text>
        <AppTooltip title="Click here to add position">
          <Link
            to={`${APP_PAGE_NAME_ROUTES.POSITION}?modal=true`}
            target="_blank"
            className="app-link"
          >
            <AddIcon />
          </Link>
        </AppTooltip>
      </Space>
    );
  }, []);

  const handleChangeEditor = (value: string) => {
    setFieldValue("jobDetail", value);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="title"
        label="Job title"
        value={values.title}
        type={TEXT}
        onChange={handleChange}
        placeholder="Enter job title"
      />
      <FormItem
        name="positionId"
        label={positionLabel}
        value={values.positionId}
        type={SELECT}
        options={dataToOptions(positions)}
        placeholder="Choose position"
      />
      <div className="part">
        <FormItem
          name="typeOfJob"
          label="Job type"
          value={values.typeOfJob}
          type={SELECT}
          options={dataToOptions(JOB_TYPES)}
          placeholder="Choose type of job"
        />
        <FormItem
          name="level"
          label="Job level"
          value={values.level}
          type={SELECT}
          options={dataToOptions(JOB_LEVELS)}
          placeholder="Choose level"
        />
        <FormItem
          name="upTo"
          label="Upto ($)"
          value={values.upTo}
          type={TEXT}
          onChange={handleChange}
          placeholder="Enter upto salary"
        />
      </div>
      <AppTextEditor
        onChange={handleChangeEditor}
        initialValue={job?.jobDetail}
        title="Job Detail"
      />
      {!!errors.jobDetail && !!touched.jobDetail && (
        <AppFormErrorMessage message={errors.jobDetail} />
      )}

      <AppButton buttonTitle={buttonTitle} htmlType="submit" />
    </Form>
  );
};

export default FormFields;
