import { FC, useMemo } from "react";

import AppTable from "@/components/AppTable";
import { ICandidateProfileTableProps } from "./interface";
import { candidateProfileTableColumns } from "@/constants/columns";

const ProfileTable: FC<ICandidateProfileTableProps> = ({
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
