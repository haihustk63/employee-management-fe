import React, { FC, useContext, useEffect, useRef } from "react";
import { Typography } from "antd";
import AppModal from "@/components/AppModal";
import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import {
  useGetCandidateProfile,
  useUpdateCandidateProfile,
} from "@/hooks/candidate";
import moment from "moment";
import { CandidateProfileContext } from "@/pages/candidate/profile";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

const initialValues = {
  assessment: undefined,
  interviewerId: undefined,
  appointmentTime: undefined,
};

const ModalUpdateCandidate: FC = () => {
  const formRef = useRef() as any;
  const { data: candidates = [] } = useGetCandidateProfile();
  const { showModal, handleToggleModal, candidateIdModal } = useContext(
    CandidateProfileContext
  ) as any;

  const {
    mutate: onUpdateCandidate,
    isError,
    isSuccess,
  } = useUpdateCandidateProfile(candidateIdModal);

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: "Update candidate profile successfully",
  });

  useEffect(() => {
    if (candidateIdModal !== undefined && candidates.length > 0) {
      const candidate = candidates.find(
        (c: any) => c.id === candidateIdModal
      ) as any;

      if (candidate) {
        const { assessment, interviewerId, appointmentTime } = candidate;
        formRef.current?.setFieldValue("assessment", assessment);
        formRef.current?.setFieldValue("interviewerId", interviewerId);
        formRef.current?.setFieldValue(
          "appointmentTime",
          appointmentTime ? moment(appointmentTime) : undefined
        );
      }
    }
  }, [candidateIdModal, candidates]);

  const handleSubmit = (values: any) => {
    onUpdateCandidate(values);
  };

  return (
    <AppModal
      open={showModal}
      onCancel={handleToggleModal}
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
