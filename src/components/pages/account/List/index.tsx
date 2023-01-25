import AppTable from "@/components/AppTable";
import { accountTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { FC, useMemo } from "react";

const ListAccount: FC<ITableDataProps> = ({
  dataSource,
  loading,
  currentPage = 0,
}) => {
  const columns = useMemo(() => {
    return accountTableColumns(currentPage);
  }, [currentPage]);

  return (
    <div className="list-account">
      <AppTable dataSource={dataSource} columns={columns} loading={loading} />
    </div>
  );
};

export default ListAccount;
