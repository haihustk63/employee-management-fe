import AppForm from "@/components/AppForm";
import { createAccountSchema } from "@/schemas";
import FormFields from "./FormField";

export interface IAddNewAccount {
  email: string;
  password: string;
  employeeId?: number;
}

const initialValues: IAddNewAccount = {
  email: "",
  password: "",
  employeeId: undefined,
};

const CreateAccountForm = ({ onSubmit }: any) => {
  return (
    <div>
      <AppForm<IAddNewAccount>
        initialValues={initialValues}
        handleSubmitForm={onSubmit}
        validationSchema={createAccountSchema}
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default CreateAccountForm;
