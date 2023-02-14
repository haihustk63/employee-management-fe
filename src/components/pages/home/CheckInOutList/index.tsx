import AppTable from "@/components/AppTable";
import { checkInOutTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { FC, useMemo } from "react";

const CheckInOutList: FC<ITableDataProps> = ({
  currentPage = 0,
  dataSource,
  loading,
}) => {
  const columns = useMemo(() => {
    return checkInOutTableColumns(currentPage);
  }, [currentPage]);
  return (
    <div className="home-check-in-out-list">
      <AppTable
        columns={columns}
        dataSource={dataSource?.data}
        loading={loading}
        tableName="Check in/out List"
      />
    </div>
  );
};

export default CheckInOutList;
