import React from "react";
import FormJob from "@/components/pages/job/FormJob";
import { useNavigate } from "react-router-dom";
import { useCreateJob } from "@/hooks/job";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";

const CreateJob = () => {
  const navigate = useNavigate();
  const { mutate: onCreateJob, isError, isSuccess } = useCreateJob();

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "A job is created successfully",
  });

  const handleSubmit = (values: any) => {
    const { upTo } = values;
    onCreateJob({ ...values, upTo: Number(upTo) });
    navigate(APP_PAGE_NAME_ROUTES.JOB_LIST);
  };

  return (
    <div className="create-job">
      <FormJob onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateJob;
