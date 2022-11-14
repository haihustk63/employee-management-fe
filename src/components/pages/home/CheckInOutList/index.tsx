import AppTable from "@/components/AppTable";

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
    name: "Harry Pham",
    checkIn: "8:00AM",
    checkOut: "17:00PM",
  },
  {
    name: "Daniel Thai",
    checkIn: "7:55AM",
    checkOut: "17:30PM",
  },
];

const CheckInOutList = () => {
  return (
    <div className="home-check-in-out-list">
      <AppTable columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default CheckInOutList;
