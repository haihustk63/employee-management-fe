import AppForm from "@/components/AppForm";
import AppModal from "@/components/AppModal";
import {
  useGetCandidateProfile,
  useUpdateCandidateProfile,
} from "@/hooks/candidate";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { CandidateProfileContext } from "@/pages/candidate";
import { FC, useContext, useEffect, useRef } from "react";
import FormFields from "./FormFields";

import { dayjs } from "@/dayjs-config";

const initialValues = {
  assessment: undefined,
  interviewerId: undefined,
  appointmentTime: undefined,
  account: undefined,
};

const ModalUpdateCandidate: FC = () => {
  const formRef = useRef() as any;
  const {
    showModal,
    handleToggleModal,
    candidateIdModal,
    candidateInfo,
    setCandidateIdModal,
  } = useContext(CandidateProfileContext) as any;

  const {
    mutate: onUpdateCandidate,
    isError,
    isSuccess,
    error,
  } = useUpdateCandidateProfile(candidateIdModal) as any;

  useTriggerNoti({
    error,
    isSuccess,
    isError,
    messageSuccess: "Update candidate profile successfully",
  });

  useEffect(() => {
    if (candidateInfo) {
      const { assessment, interviewerId, appointmentTime, employeeAccount } =
        candidateInfo;
      formRef.current?.setFieldValue("assessment", assessment);
      formRef.current?.setFieldValue("account", employeeAccount?.email);
      formRef.current?.setFieldValue("interviewerId", interviewerId);
      formRef.current?.setFieldValue(
        "appointmentTime",
        appointmentTime ? dayjs(appointmentTime) : undefined
      );
    }
  }, [candidateInfo]);

  const handleSubmit = (values: any) => {
    delete values?.account;
    onUpdateCandidate(values);
  };

  const toggleModal = () => {
    handleToggleModal();
    setCandidateIdModal("");
  };

  return (
    <AppModal
      open={showModal}
      onCancel={toggleModal}
      wrapClassName="modal-update-candidate"
      title="Update candidate"
    >
      <AppForm
        initialValues={initialValues}
        innerRef={formRef}
        handleSubmitForm={handleSubmit}
      >
        <FormFields />
      </AppForm>
    </AppModal>
  );
};

export default ModalUpdateCandidate;
