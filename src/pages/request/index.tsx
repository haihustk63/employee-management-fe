import RequestList from "@/components/pages/request/List";
import Search from "@/components/pages/request/Search";
import { useGetRequests } from "@/hooks/request";
import { useTableParams } from "@/hooks/useTableParams";
import { createContext } from "react";

export const RequestManagementContext = createContext({});

const RequestManagement = () => {
  const {
    queryParams,
    needResetPage,
    searchParams,
    isInit,
    setIsInit,
    onChangeTableParams,
    resetPageParams,
    setQueryParams,
  } = useTableParams();

  const {
    data: requests = {},
    isFetching,
    isLoading,
  } = useGetRequests(queryParams);

  return (
    <RequestManagementContext.Provider
      value={{
        queryParams,
        needResetPage,
        searchParams,
        isInit,
        setIsInit,
        onChangeTableParams,
        resetPageParams,
        setQueryParams,
      }}
    >
      <Search />
      <RequestList dataSource={requests} loading={isFetching || isLoading} />
    </RequestManagementContext.Provider>
  );
};

export default RequestManagement;
