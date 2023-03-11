import AppButton from "@/components/AppButton";
import { AppSelect } from "@/components/AppFormField";
import AppModal from "@/components/AppModal";
import { useGetAccounts } from "@/hooks/account";
import { TestsContext } from "@/pages/tests";
import { useContext, useMemo } from "react";

const AssignTestModal = () => {
  const {
    assignment,
    loadingAssingTest,
    setAssignment,
    showAssignModal,
    handleCloseAssignModal,
    assignTest,
  } = useContext(TestsContext) as any;
  const { data: accounts = {} } = useGetAccounts(undefined);

  const accountOptions = useMemo(() => {
    return accounts.data
      ?.filter((account: any) => !account.employeeId)
      .map((account: any) => ({ value: account.email, label: account.email }));
  }, [accounts]);

  const changeEmail = (email: string) => {
    setAssignment((prev: any) => ({ ...prev, email }));
  };

  const handleAssign = () => {
    assignTest();
  };

  const Footer = (
    <AppButton
      buttonTitle="Confirm"
      onClick={handleAssign}
      disabled={!assignment.email}
      loading={loadingAssingTest}
    />
  );

  return (
    <AppModal
      title="Assign Test"
      open={showAssignModal}
      onCancel={handleCloseAssignModal}
      footer={Footer}
      wrapClassName="assign-test-modal"
    >
      <AppSelect
        placeholder="Choose email"
        showSearch
        value={assignment?.email}
        options={accountOptions}
        onChange={changeEmail}
        allowClear
      />
    </AppModal>
  );
};

export default AssignTestModal;
