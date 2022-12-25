import AppForm from "@/components/AppForm";
import { createJobSchema } from "@/schemas";
import { FC } from "react";
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
  return (
    <div>
      <AppForm<IAddNewCandidateAccount>
        initialValues={initialValues}
        handleSubmitForm={onSubmit}
        validationSchema={createJobSchema}
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default FormJob;
