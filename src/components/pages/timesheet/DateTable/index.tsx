import { FC, useMemo } from "react";
import { Typography } from "antd";
import AppTable from "@/components/AppTable";
import { timesheetTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { dayjs } from "@/dayjs-config";

const DateTable: FC<ITableDataProps> = ({ dataSource, loading }) => {
  const columns = useMemo(() => {
    return timesheetTableColumns(dataSource?.page || 1);
  }, [dataSource]);

  return (
    <div>
      <Typography.Text>{dayjs(Date.now()).format("MMMM YYYY")}</Typography.Text>
      <AppTable
        dataSource={dataSource?.data}
        loading={loading}
        columns={columns}
        total={dataSource?.total}
        pageSize={31}
        pagination
      />
    </div>
  );
};

export default DateTable;
