import ModalUpdateCandidate from "@/components/pages/candidate/ModalUpdate";
import CandidateProfileTable from "@/components/pages/candidate/ProfileTable";
import { useGetCandidateProfile } from "@/hooks/candidate";
import useModal from "@/hooks/useModal";
import { createContext, useState } from "react";

export const CandidateProfileContext = createContext({});

const CandidateProfileManagement = () => {
  const { data, error, isFetching, isLoading, isError } =
    useGetCandidateProfile();

  const [candidateIdModal, setCandidateIdModal] = useState<string | number>();
  const { showModal, handleToggleModal } = useModal();

  const handleSetCandidateId = (id: string | number) => () => {
    setCandidateIdModal(id);
    handleToggleModal();
  };

  return (
    <CandidateProfileContext.Provider
      value={{
        showModal,
        candidateIdModal,
        handleToggleModal,
        handleSetCandidateId,
      }}
    >
      <div className="candidate-profile">
        <CandidateProfileTable
          dataSource={data}
          loading={isFetching || isLoading}
        />

        <ModalUpdateCandidate />
      </div>
    </CandidateProfileContext.Provider>
  );
};

export default CandidateProfileManagement;
