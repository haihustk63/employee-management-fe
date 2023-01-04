import { createContext, useState } from "react";
import AppButton from "@/components/AppButton";
import appNotification from "@/components/AppNotification";
import ModalCreateAccountForm from "@/components/pages/account/FormCreate";
import ListAccount from "@/components/pages/account/List";
import {
  useCreateAccount,
  useGetAccounts,
  useUpdateAccount,
} from "@/hooks/account";
import useModal from "@/hooks/useModal";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

export const AccountManagementContext = createContext({});

const AccountManagement = () => {
  const { data: accounts = [], isLoading, isFetching } = useGetAccounts();
  const { mutate: onCreateAccount, isSuccess, isError } = useCreateAccount();
  const {
    mutate: onUpdate,
    isSuccess: updateSuccess,
    isError: updateError,
  } = useUpdateAccount();
  const { handleToggleModal, showModal } = useModal();
  const [updateEmail, setUpdateEmail] = useState("");

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: "An account has been created",
    messageError: "Please check if the account is already existed",
  });

  useTriggerNoti({
    isSuccess: updateSuccess,
    isError: updateError,
    messageSuccess: "Update account successfully",
  });

  const onSubmitForm = (values: any) => {
    const { employeeId, email } = values;
    const hasAccount = accounts?.findIndex(
      (account: any) => account.employeeId === employeeId
    );

    if (hasAccount >= 0) {
      appNotification({
        description: "This employee has already had an account",
        message: "Error",
        type: "error",
      });
      return;
    }

    if (updateEmail) {
      onUpdate({ email, employeeId });
      handleSetEmail("");
      handleToggleModal();
    } else {
      onCreateAccount(values);
    }
  };

  const handleSetEmail = (email: string) => {
    setUpdateEmail(email);
  };

  const handleClickCreate = () => {
    handleSetEmail("");
    handleToggleModal();
  };

  return (
    <AccountManagementContext.Provider
      value={{
        onSubmitForm,
        updateEmail,
        handleSetEmail,
        showModal,
        handleToggleModal,
        accounts,
      }}
    >
      <div className="candidate-account-management">
        <AppButton buttonTitle="Create account" onClick={handleClickCreate} />
        <ListAccount dataSource={accounts} loading={isLoading || isFetching} />
        <ModalCreateAccountForm />
      </div>
    </AccountManagementContext.Provider>
  );
};

export default AccountManagement;
