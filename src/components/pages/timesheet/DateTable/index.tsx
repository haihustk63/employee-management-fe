import { FC, useMemo } from "react";
import { Typography } from "antd";
import AppTable from "@/components/AppTable";
import { timesheetTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { dayjs } from "@/dayjs-config";

const DateTable: FC<ITableDataProps> = ({
  currentPage = 0,
  dataSource,
  loading,
}) => {
  const columns = useMemo(() => {
    return timesheetTableColumns(currentPage);
  }, [currentPage]);

  return (
    <div>
      <Typography.Text>{dayjs(Date.now()).format("MMMM YYYY")}</Typography.Text>
      <AppTable dataSource={dataSource} loading={loading} columns={columns} />
    </div>
  );
};

export default DateTable;
