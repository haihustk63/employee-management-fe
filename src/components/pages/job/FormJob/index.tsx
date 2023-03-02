import AppForm from "@/components/AppForm";
import { createJobSchema } from "@/schemas";
import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import FormFields from "./FormField";

export interface IAddNewCandidateAccount {
  title: string;
  typeOfJob?: 0 | 1;
  upTo: string;
  level?: 0 | 1 | 2 | 3 | 4;
  jobDetail: string;
  positionId?: number;
}

const initialValues: IAddNewCandidateAccount = {
  title: "",
  typeOfJob: undefined,
  upTo: "",
  level: undefined,
  jobDetail: "",
  positionId: undefined,
};

const FormJob: FC<{ onSubmit: any }> = ({ onSubmit }) => {
  const { jobId = "" } = useParams();

  const formTitle = useMemo(() => {
    if (jobId) {
      return "Update Job";
    } else {
      return "New Job";
    }
  }, [jobId]);

  return (
    <AppForm<IAddNewCandidateAccount>
      initialValues={initialValues}
      handleSubmitForm={onSubmit}
      validationSchema={createJobSchema}
      title={formTitle}
    >
      <FormFields />
    </AppForm>
  );
};

export default FormJob;
