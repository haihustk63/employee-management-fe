import AppTable from "@/components/AppTable";
import { accountTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { AccountManagementContext } from "@/pages/account";
import { FC, useContext, useMemo } from "react";

const ListAccount: FC<ITableDataProps> = ({ dataSource, loading }) => {
  const { onChangeTableParams } = useContext(AccountManagementContext) as any;

  const columns = useMemo(() => {
    return accountTableColumns(dataSource?.page || 1);
  }, [dataSource]);

  return (
    <div className="list-account">
      <AppTable
        dataSource={dataSource?.data}
        total={dataSource?.total}
        columns={columns}
        loading={loading}
        onChangeParams={onChangeTableParams}
      />
    </div>
  );
};

export default ListAccount;
