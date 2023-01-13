import AppTable from "@/components/AppTable";
import { requestsTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { currentUserAtom } from "@/modules/currentUser";
import React, { FC, useMemo } from "react";
import { useRecoilValue } from "recoil";

const RequestList: FC<ITableDataProps> = ({
  currentPage = 0,
  dataSource,
  loading,
}) => {
  const { employee } = useRecoilValue(currentUserAtom);
  const columns = useMemo(() => {
    return requestsTableColumns(currentPage, employee?.role);
  }, [currentPage, employee]);

  return (
    <AppTable dataSource={dataSource} loading={loading} columns={columns} />
  );
};

export default RequestList;
