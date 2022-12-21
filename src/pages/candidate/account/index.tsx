import appNotification from "@/components/AppNotification";
import CandidateCreateAccountForm from "@/components/pages/candidate/account/FormCreate";
import ListCandidateAccount from "@/components/pages/candidate/account/List";
import {
  useCreateCandidateAccount,
  useGetCandidateAccount,
} from "@/hooks/candidate";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

const CandidateAccountManagement = () => {
  const { data = [], isLoading, isFetching } = useGetCandidateAccount();
  const {
    mutate: onCreateAccount,
    isSuccess,
    isError,
  } = useCreateCandidateAccount();

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: "An account has been created",
  });

  const onSubmitForm = (values: any) => {
    const { candidateId } = values;
    const hasAccount = data?.findIndex(
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
    onCreateAccount(values);
  };

  return (
    <div className="candidate-account-management">
      <CandidateCreateAccountForm onSubmit={onSubmitForm} />
      <ListCandidateAccount
        dataSource={data}
        loading={isLoading || isFetching}
      />
    </div>
  );
};

export default CandidateAccountManagement;
