import ModalUpdateCandidate from "@/components/pages/candidate/ModalUpdate";
import CandidateProfileTable from "@/components/pages/candidate/ProfileTable";
import { useGetCandidateProfile } from "@/hooks/candidate";
import useModal from "@/hooks/useModal";
import { createContext, useMemo, useState } from "react";

export const CandidateProfileContext = createContext({});

const CandidateProfileManagement = () => {
  const {
    data: candidates = [],
    error,
    isFetching,
    isLoading,
    isError,
  } = useGetCandidateProfile();

  const [candidateIdModal, setCandidateIdModal] = useState<string | number>();
  const { showModal, handleToggleModal } = useModal();

  const candidateInfo = useMemo(() => {
    return candidates.find(
      (candidate: any) => candidate.id === candidateIdModal
    );
  }, [candidateIdModal]);

  const handleSetCandidateId = (id: string | number) => () => {
    setCandidateIdModal(id);
    handleToggleModal();
  };

  return (
    <CandidateProfileContext.Provider
      value={{
        showModal,
        candidateIdModal,
        candidateInfo,
        handleToggleModal,
        setCandidateIdModal,
        handleSetCandidateId,
      }}
    >
      <div className="candidate-profile">
        <CandidateProfileTable
          dataSource={candidates}
          loading={isFetching || isLoading}
        />

        <ModalUpdateCandidate />
      </div>
    </CandidateProfileContext.Provider>
  );
};

export default CandidateProfileManagement;
