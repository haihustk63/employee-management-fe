import AppTable from "@/components/AppTable";
import { candidateAccountTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { useDeleteCandidateAccount } from "@/hooks/candidate";
import React, { FC, useMemo, useState } from "react";

const ListCandidateAccount: FC<ITableDataProps> = ({
  dataSource,
  loading,
  currentPage = 0,
}) => {
  const columns = useMemo(() => {
    return candidateAccountTableColumns(currentPage);
  }, [currentPage]);

  return (
    <div className="list-candidate-account">
      <AppTable
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        tableName="Candidate account"
      />
    </div>
  );
};

export default ListCandidateAccount;
