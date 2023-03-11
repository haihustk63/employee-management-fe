import { FC, useContext, useMemo } from "react";

import AppTable from "@/components/AppTable";
import { candidateProfileTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { CandidateProfileContext } from "@/pages/candidate";

const ProfileTable: FC<ITableDataProps> = ({ dataSource, loading }) => {
  const { needResetPage, onChangeTableParams } = useContext(
    CandidateProfileContext
  ) as any;

  const columns = useMemo(() => {
    return candidateProfileTableColumns(dataSource?.page || 1);
  }, [dataSource]);

  return (
    <AppTable
      dataSource={dataSource?.data}
      total={dataSource?.total}
      columns={columns}
      loading={loading}
      onChangeParams={onChangeTableParams}
      needResetPage={needResetPage}
      tableName="Candidate management"
    />
  );
};

export default ProfileTable;
