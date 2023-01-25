import AppButton from "@/components/AppButton";
import AppForm from "@/components/AppForm";
import AppModal from "@/components/AppModal";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES } from "@/constants/common";
import { useUpdateAccount } from "@/hooks/account";
import { useGetCandidateProfile } from "@/hooks/candidate";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { AccountManagementContext } from "@/pages/account";
import { assignCandidateAccountSchema } from "@/schemas";
import { dataToOptions } from "@/utils";
import { Form } from "formik";
import { useContext, useMemo } from "react";

const initialValues = {
  candidateId: undefined,
};

const ModalAssignAccount = () => {
  const { data: candidates = [] } = useGetCandidateProfile();
  const { account, showAssignModal, toggleAssignModal } = useContext(
    AccountManagementContext
  ) as any;

  const candidateOptions = useMemo(() => {
    return dataToOptions(
      candidates
        .filter((candidate: any) => !candidate.employeeAccount)
        .map((candidate: any) => ({
          value: candidate.id,
          label: `${candidate.name} (${candidate.email})`,
        }))
    );
  }, [candidates]);

  const {
    mutate: updateAccount,
    isError: updateError,
    isSuccess: updateSuccess,
  } = useUpdateAccount();

  useTriggerNoti({
    isError: updateError,
    isSuccess: updateSuccess,
    messageSuccess: "Assign account successfully",
  });

  const handleSubmit = (values: any) => {
    updateAccount({ candidateId: values.candidateId, email: account });
  };

  return (
    <AppModal open={showAssignModal} onCancel={toggleAssignModal}>
      <AppForm
        initialValues={initialValues}
        validationSchema={assignCandidateAccountSchema}
        handleSubmitForm={handleSubmit}
        title="Assign Candidate"
      >
        {({ values, handleChange }: any) => (
          <Form className="form">
            <FormItem
              name="account"
              value={account}
              type={FORM_ITEM_TYPES.TEXT}
              placeholder="Account"
              disabled
            />

            <FormItem
              name="candidateId"
              value={values.candidateId}
              type={FORM_ITEM_TYPES.SELECT}
              placeholder="Select candidate"
              options={candidateOptions}
            />
            <AppButton buttonTitle="Submit" htmlType="submit" />
          </Form>
        )}
      </AppForm>
    </AppModal>
  );
};

export default ModalAssignAccount;
