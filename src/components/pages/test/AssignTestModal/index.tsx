import AppButton from "@/components/AppButton";
import AppFormErrorMessage from "@/components/AppFormErrorMessage";
import { AppSelect } from "@/components/AppFormField";
import AppModal from "@/components/AppModal";
import { useGetAccounts } from "@/hooks/account";
import { TestsContext } from "@/pages/tests";
import { useContext, useMemo, useState } from "react";

const AssignTestModal = () => {
  const {
    assignment,
    setAssignment,
    showAssignModal,
    handleCloseAssignModal,
    assignTest,
  } = useContext(TestsContext) as any;
  const { data: accounts = {} } = useGetAccounts(undefined);
  const [error, setError] = useState(false);

  const accountOptions = useMemo(() => {
    return accounts.data
      ?.filter((account: any) => !account.employeeId)
      .map((account: any) => ({ value: account.email, label: account.email }));
  }, [accounts]);

  const changeEmail = (email: string) => {
    setError(false);
    setAssignment((prev: any) => ({ ...prev, email }));
  };

  const handleAssign = () => {
    if (assignment.email === undefined) {
      setError(true);
      return;
    }
    assignTest();
  };

  const Footer = <AppButton buttonTitle="Confirm" onClick={handleAssign} />;

  return (
    <AppModal
      title="Assign Test"
      open={showAssignModal}
      onCancel={handleCloseAssignModal}
      footer={Footer}
    >
      <AppSelect
        placeholder="Choose email"
        showSearch
        value={assignment?.email}
        options={accountOptions}
        onChange={changeEmail}
        allowClear
      />

      {error && <AppFormErrorMessage message="Email is required" />}
    </AppModal>
  );
};

export default AssignTestModal;
