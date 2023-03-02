import AppTable from "@/components/AppTable";
import { timesheetTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { FC } from "react";

const DateTable: FC<ITableDataProps> = ({ dataSource, loading }) => {
  return (
    <AppTable
      dataSource={dataSource?.data}
      loading={loading}
      columns={timesheetTableColumns()}
      total={dataSource?.total}
      pageSize={31}
      pagination={false}
    />
  );
};

export default DateTable;
