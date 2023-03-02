import JobDetailModal from "@/components/pages/job/JobDetailModal";
import ListJob from "@/components/pages/job/List";
import Search from "@/components/pages/job/Search";
import { useGetAllJobs } from "@/hooks/job";
import useModal from "@/hooks/useModal";
import { useTableParams } from "@/hooks/useTableParams";
import { Typography } from "antd";
import { createContext, useEffect, useMemo, useState } from "react";

const { Text } = Typography;

export const JobManagementContext = createContext({});

const JobManagement = () => {
  const {
    isInit,
    needResetPage,
    searchParams,
    queryParams,
    resetPageParams,
    onChangeTableParams,
    setQueryParams,
    setIsInit,
  } = useTableParams();

  const [jobId, setJobId] = useState("");
  const {
    showModal: showJobDetailModal,
    handleToggleModal: toggleJobDetailModal,
  } = useModal();

  const { data: jobs = {}, isLoading, isFetching } = useGetAllJobs(queryParams);

  const jobInfo = useMemo(() => {
    return jobs.data?.find((job: any) => job.id === jobId);
  }, [jobId]);

  useEffect(() => {
    if (jobId) {
      toggleJobDetailModal();
    }
  }, [jobId]);

  const onToggleJobDetailModal = () => {
    toggleJobDetailModal();
    setJobId("");
  };

  return (
    <JobManagementContext.Provider
      value={{
        queryParams,
        isInit,
        searchParams,
        needResetPage,
        jobInfo,
        showJobDetailModal,
        resetPageParams,
        onChangeTableParams,
        setQueryParams,
        setIsInit,
        setJobId,
        onToggleJobDetailModal,
      }}
    >
      <div className="job-management">
        <Text className="app-title">Job Management</Text>
        <Search />
        <ListJob dataSource={jobs} loading={isLoading || isFetching} />
        <JobDetailModal />
      </div>
    </JobManagementContext.Provider>
  );
};

export default JobManagement;
