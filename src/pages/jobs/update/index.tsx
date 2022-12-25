import FormJob from "@/components/pages/job/FormJob";
import { useUpdateJob } from "@/hooks/job";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { useParams } from "react-router-dom";

const UpdateJob = () => {
  const { jobId } = useParams();
  const { mutate: onUpdateJob, isSuccess, isError } = useUpdateJob(jobId);

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: "Update job successfully",
  });

  const handleSubmit = (values: any) => {
    const { upTo } = values;
    onUpdateJob({ ...values, upTo: Number(upTo) });
  };

  return (
    <div className="update-job">
      <FormJob onSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateJob;
