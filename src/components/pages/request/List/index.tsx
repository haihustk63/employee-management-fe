import AppTable from "@/components/AppTable";
import { requestsTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import React, { FC, useMemo } from "react";

const RequestList: FC<ITableDataProps> = ({
  currentPage = 0,
  dataSource,
  loading,
}) => {
  const columns = useMemo(() => {
    return requestsTableColumns(currentPage);
  }, [currentPage]);
  return (
    <AppTable dataSource={dataSource} loading={loading} columns={columns} />
  );
};

export default RequestList;
