import AppTable from "@/components/AppTable";
import { jobsTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import React, { FC, useMemo } from "react";

const ListJob: FC<ITableDataProps> = ({
  currentPage = 0,
  dataSource,
  loading,
}) => {
  const colums = useMemo(() => {
    return jobsTableColumns(currentPage);
  }, [currentPage]);

  return (
    <AppTable dataSource={dataSource} loading={loading} columns={colums} />
  );
};

export default ListJob;
