import AppTable from "@/components/AppTable";
import { checkInOutTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { FC, useMemo } from "react";

const CheckInOutList: FC<ITableDataProps> = ({ dataSource, loading }) => {
  const columns = useMemo(() => {
    return checkInOutTableColumns();
  }, []);
  return (
    <div className="home-check-in-out-list">
      <AppTable
        columns={columns}
        dataSource={dataSource?.data}
        pageSize={100}
        loading={loading}
        tableName="Daily attendance"
      />
    </div>
  );
};

export default CheckInOutList;
