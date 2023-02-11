import AppButton from "@/components/AppButton";
import appNotification from "@/components/AppNotification";
import ModalCreateAccountForm from "@/components/pages/account/FormCreate";
import ListAccount from "@/components/pages/account/List";
import { useCreateAccount, useGetAccounts } from "@/hooks/account";
import useModal from "@/hooks/useModal";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { createContext, useState } from "react";
import { Typography } from "antd";
import ModalAssignAccount from "@/components/pages/account/ModalAssign";
import { useTableParams } from "@/hooks/useTableParams";

const { Text } = Typography;

export const AccountManagementContext = createContext({});

const AccountManagement = () => {
  const { onChangeTableParams, queryParams } = useTableParams();
  const {
    data: accounts = [],
    isLoading,
    isFetching,
  } = useGetAccounts(queryParams);

  const {
    mutate: onCreateAccount,
    isSuccess,
    isError,
    error,
  } = useCreateAccount();
  const [account, setAccount] = useState();

  const { showModal, handleToggleModal } = useModal();
  const { showModal: showAssignModal, handleToggleModal: toggleAssignModal } =
    useModal();

  const [switchOn, setSwitchOn] = useState(false);

  useTriggerNoti({
    isSuccess,
    isError,
    error,
    messageSuccess: "An account has been created",
  });

  const toggleSwitch = () => {
    setSwitchOn(!switchOn);
  };

  const onSubmitForm = (values: any) => {
    const { employeeId, candidateId, email, password } = values;
    const account = accounts.find((acc: any) => acc.email === email);
    if (account) {
      appNotification({
        description: "This account has been existed",
        message: "Error",
        type: "error",
      });
      return;
    }

    let formData;

    if (switchOn) {
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

      formData = { employeeId, email, password };
    } else {
      const hasAccount = accounts?.findIndex(
        (account: any) => account.candidateId === candidateId
      );

      if (hasAccount >= 0) {
        appNotification({
          description: "This candidate has already had an account",
          message: "Error",
          type: "error",
        });
        return;
      }

      formData = { candidateId, email, password };
    }

    onCreateAccount(formData);
  };

  const handleClickCreate = () => {
    handleToggleModal();
  };

  return (
    <AccountManagementContext.Provider
      value={{
        showModal,
        accounts,
        switchOn,
        showAssignModal,
        account,
        onSubmitForm,
        handleToggleModal,
        toggleSwitch,
        toggleAssignModal,
        setAccount,
        onChangeTableParams,
      }}
    >
      <div className="account-management">
        <div className="title">
          <Text className="app-title">Accounts</Text>
          <AppButton
            buttonTitle="Create account"
            size="small"
            onClick={handleClickCreate}
          />
        </div>
        <ListAccount dataSource={accounts} loading={isLoading || isFetching} />
        <ModalCreateAccountForm />
        <ModalAssignAccount />
      </div>
    </AccountManagementContext.Provider>
  );
};

export default AccountManagement;
