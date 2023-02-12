import { useSearchParams } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import ListJob from "@/components/pages/job/List";
import { useGetAllJobs } from "@/hooks/job";
import Search from "@/components/pages/job/Search";
import { Typography } from "antd";
import { useTableParams } from "@/hooks/useTableParams";

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
  
  const { data: jobs, isLoading, isFetching } = useGetAllJobs(queryParams);

  return (
    <JobManagementContext.Provider
      value={{
        queryParams,
        isInit,
        searchParams,
        needResetPage,
        resetPageParams,
        onChangeTableParams,
        setQueryParams,
        setIsInit,
      }}
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
