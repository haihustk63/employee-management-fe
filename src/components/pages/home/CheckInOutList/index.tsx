import AppTable from "@/components/AppTable";
import { checkInOutTableColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { FC, useMemo } from "react";

const columns = [
  {
    key: "name",
    dataIndex: "name",
    width: "40%",
    title: "Name",
  },
  {
    key: "checkIn",
    dataIndex: "checkIn",
    width: "30%",
    title: "Check in",
  },
  {
    key: "checkOut",
    dataIndex: "checkOut",
    title: "Check out",
  },
];

const dataSource = [
  {
    key: 0,
    name: "Harry Pham",
    checkIn: "8:00AM",
    checkOut: "17:00PM",
  },
  {
    key: 1,
    name: "Daniel Thai",
    checkIn: "7:55AM",
    checkOut: "17:30PM",
  },
];

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
        dataSource={dataSource}
        loading={loading}
        tableName="Check in/out List"
      />
    </div>
  );
};

export default CheckInOutList;
