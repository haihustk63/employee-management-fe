import AppTable from "@/components/AppTable";
import { jobsTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { JobManagementContext } from "@/pages/jobs";
import { FC, useContext, useMemo } from "react";

const ListJob: FC<ITableDataProps> = ({ dataSource, loading }) => {
  const { needResetPage, onChangeTableParams } = useContext(
    JobManagementContext
  ) as any;
  const colums = useMemo(() => {
    return jobsTableColumns(dataSource?.page || 1);
  }, [dataSource]);

  return (
    <AppTable
      dataSource={dataSource?.data}
      total={dataSource?.total}
      loading={loading}
      columns={colums}
      onChangeParams={onChangeTableParams}
      needResetPage={needResetPage}
    />
  );
};

export default ListJob;
