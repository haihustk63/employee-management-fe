import { useSearchParams } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import ListJob from "@/components/pages/job/List";
import { useGetAllJobs } from "@/hooks/job";
import Search from "@/components/pages/job/Search";
import { Typography } from "antd";

const { Text } = Typography;

export const JobManagementContext = createContext({});

const JobManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState();
  const { data: jobs, isLoading, isFetching } = useGetAllJobs(queryParams);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    if (isInit) {
      setSearchParams(queryParams as any);
    }
  }, [queryParams, isInit]);

  return (
    <JobManagementContext.Provider
      value={{ queryParams, isInit, setQueryParams, searchParams, setIsInit }}
    >
      <div className="job-management">
        <Text className="app-title">Jobs</Text>
        <Search />
        <ListJob dataSource={jobs} loading={isLoading || isFetching} />
      </div>
    </JobManagementContext.Provider>
  );
};

export default JobManagement;
