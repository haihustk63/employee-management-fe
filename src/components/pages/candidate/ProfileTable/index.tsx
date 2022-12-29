import { FC, useContext, useMemo } from "react";

import AppTable from "@/components/AppTable";
import { candidateProfileTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { CandidateProfileContext } from "@/pages/candidate";

const ProfileTable: FC<ITableDataProps> = ({
  dataSource,
  loading,
  currentPage = 0,
}) => {
  const columns = useMemo(() => {
    return candidateProfileTableColumns(currentPage);
  }, [currentPage]);
  return (
    <AppTable
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      tableName="Candidate profile"
    />
  );
};

export default ProfileTable;
