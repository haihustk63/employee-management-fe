import CandidateProfileTable from "@/components/pages/candidate/profile/ProfileTable";
import { useGetCandidateProfile } from "@/hooks/candidate";

const CandidateProfileManagement = () => {
  const { data, error, isFetching, isLoading, isError } =
    useGetCandidateProfile();

  return (
    <div className="candidate-profile">
      <CandidateProfileTable
        dataSource={data}
        loading={isFetching || isLoading}
      />
    </div>
  );
};

export default CandidateProfileManagement;
