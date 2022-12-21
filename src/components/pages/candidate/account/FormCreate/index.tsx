import AppForm from "@/components/AppForm";
import { createCandidateAccountSchema } from "@/schemas";
import FormFields from "./FormField";

export interface IAddNewCandidateAccount {
  username: string;
  password: string;
  candidateId?: number;
}

const initialValues: IAddNewCandidateAccount = {
  username: "",
  password: "",
  candidateId: undefined,
};

const CandidateCreateAccountForm = ({ onSubmit }: any) => {
  
  return (
    <div>
      <AppForm<IAddNewCandidateAccount>
        initialValues={initialValues}
        handleSubmitForm={onSubmit}
        validationSchema={createCandidateAccountSchema}
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default CandidateCreateAccountForm;
