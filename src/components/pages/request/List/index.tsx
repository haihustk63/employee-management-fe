import AppTable from "@/components/AppTable";
import { requestsTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { currentUserAtom } from "@/modules/currentUser";
import { RequestManagementContext } from "@/pages/request";
import { getRequestRows } from "@/utils";
import { FC, useContext, useMemo } from "react";
import { useRecoilValue } from "recoil";

const RequestList: FC<ITableDataProps> = ({ dataSource, loading }) => {
  const { employee } = useRecoilValue(currentUserAtom);
  const { needResetPage, onChangeTableParams } = useContext(
    RequestManagementContext
  ) as any;

  const columns = useMemo(() => {
    return requestsTableColumns(dataSource?.page || 1, employee?.role);
  }, [dataSource, employee]);

  return (
    <AppTable
      dataSource={getRequestRows(dataSource?.data)}
      total={dataSource?.total}
      loading={loading}
      columns={columns}
      onChangeParams={onChangeTableParams}
      needResetPage={needResetPage}
    />
  );
};

export default RequestList;
