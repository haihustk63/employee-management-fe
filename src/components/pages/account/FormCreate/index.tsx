import AppForm from "@/components/AppForm";
import AppModal from "@/components/AppModal";
import { AccountManagementContext } from "@/pages/account";
import { createAccountSchema, updateAccountSchema } from "@/schemas";
import { useContext, useEffect, useMemo, useRef } from "react";
import FormFields from "./FormField";

export interface IAddNewAccount {
  email: string;
  password: string;
  employeeId?: number;
  candidateId?: number;
}

const initialValues: IAddNewAccount = {
  email: "",
  password: "",
  employeeId: undefined,
  candidateId: undefined
};

const ModalCreateAccountForm = () => {
  const { onSubmitForm, showModal, handleToggleModal, updateEmail, accounts } =
    useContext(AccountManagementContext) as any;

  const formRef = useRef() as any;

  const titleModal = useMemo(() => {
    if (updateEmail) {
      return "Update Account";
    } else {
      return "Create Account";
    }
  }, [updateEmail]);

  const schema = useMemo(() => {
    if (updateEmail) {
      return updateAccountSchema;
    } else {
      return createAccountSchema;
    }
  }, [updateEmail]);

  useEffect(() => {
    if (updateEmail) {
      const account = accounts?.find((acc: any) => acc.email === updateEmail);
      if (account) {
        const { employeeId } = account;
        formRef?.current?.setFieldValue?.("email", updateEmail);
        formRef?.current?.setFieldValue?.(
          "employeeId",
          employeeId ?? undefined
        );
      }
    } else {
      formRef?.current?.setFieldValue?.("email", "");
      formRef?.current?.setFieldValue?.("employeeId", undefined);
    }
  }, [updateEmail]);

  return (
    <AppModal open={showModal} onCancel={handleToggleModal} title={titleModal}>
      <AppForm<IAddNewAccount>
        initialValues={initialValues}
        validationSchema={schema}
        handleSubmitForm={onSubmitForm}
        innerRef={formRef}
      >
        <FormFields />
      </AppForm>
    </AppModal>
  );
};

export default ModalCreateAccountForm;
