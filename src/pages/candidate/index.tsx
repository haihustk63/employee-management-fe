import ModalUpdateCandidate from "@/components/pages/candidate/ModalUpdate";
import CandidateProfileTable from "@/components/pages/candidate/ProfileTable";
import Search from "@/components/pages/candidate/Search";
import { useGetCandidateProfile } from "@/hooks/candidate";
import useModal from "@/hooks/useModal";
import { useTableParams } from "@/hooks/useTableParams";
import { createContext, useMemo, useState } from "react";

export const CandidateProfileContext = createContext({});

const CandidateProfileManagement = () => {
  const {
    isInit,
    needResetPage,
    queryParams,
    searchParams,
    onChangeTableParams,
    resetPageParams,
    setIsInit,
    setQueryParams,
  } = useTableParams();

  const {
    data: candidates = {},
    isFetching,
    isLoading,
  } = useGetCandidateProfile(queryParams) as any;

  const [candidateIdModal, setCandidateIdModal] = useState<string | number>();
  const { showModal, handleToggleModal } = useModal();

  const candidateInfo = useMemo(() => {
    return candidates.data?.find(
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
        isInit,
        needResetPage,
        queryParams,
        searchParams,
        handleToggleModal,
        setCandidateIdModal,
        handleSetCandidateId,
        onChangeTableParams,
        resetPageParams,
        setIsInit,
        setQueryParams,
      }}
    >
      <div className="candidate-profile">
        <Search />
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
