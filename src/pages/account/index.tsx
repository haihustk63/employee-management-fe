import AppButton from "@/components/AppButton";
import appNotification from "@/components/AppNotification";
import ModalCreateAccountForm from "@/components/pages/account/FormCreate";
import ListAccount from "@/components/pages/account/List";
import {
  useCreateAccount,
  useGetAccounts
} from "@/hooks/account";
import useModal from "@/hooks/useModal";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { createContext } from "react";

export const AccountManagementContext = createContext({});

const AccountManagement = () => {
  const { data: accounts = [], isLoading, isFetching } = useGetAccounts();
  const { mutate: onCreateAccount, isSuccess, isError } = useCreateAccount();
  const { handleToggleModal, showModal } = useModal();

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: "An account has been created",
    messageError: "Please check if the account is already existed",
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

    onCreateAccount(values);
  };

  const handleClickCreate = () => {
    handleToggleModal();
  };

  return (
    <AccountManagementContext.Provider
      value={{
        onSubmitForm,
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
