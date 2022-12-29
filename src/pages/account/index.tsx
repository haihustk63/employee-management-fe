import appNotification from "@/components/AppNotification";
import CreateAccountForm from "@/components/pages/account/FormCreate";
import ListAccount from "@/components/pages/account/List";
import { useCreateAccount, useGetAccounts } from "@/hooks/account";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

const AccountManagement = () => {
  const { data: accounts = [], isLoading, isFetching } = useGetAccounts();
  const { mutate: onCreateAccount, isSuccess, isError } = useCreateAccount();

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: "An account has been created",
  });

  const onSubmitForm = (values: any) => {
    const { employeeId } = values;
    console.log(employeeId, accounts)
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

  return (
    <div className="candidate-account-management">
      <CreateAccountForm onSubmit={onSubmitForm} />
      <ListAccount dataSource={accounts} loading={isLoading || isFetching} />
    </div>
  );
};

export default AccountManagement;
