import AppButton from "@/components/AppButton";
import AppTable from "@/components/AppTable";
import { useState } from "react";

const columns = (onClickButtonViewEmployees: any) => [
  {
    key: "name",
    dataIndex: "name",
    title: "Name",
  },
  {
    key: "description",
    dataIndex: "description",
    title: "Description",
  },
  {
    key: "action",
    dataIndex: "action",
    title: "Action",
    width: "20%",
    render: () => {
      return (
        <AppButton
          buttonTitle="View Employees"
          htmlType="button"
          onClick={onClickButtonViewEmployees}
        />
      );
    },
  },
];

const dataSource = [
  {
    key: 0,
    name: "Example 1",
    description: "Something",
    manager: "Example manager",
  },
  {
    key: 1,
    name: "Example 2",
    description: "Something",
    manager: "Example manager",
  },
];

const columns2 = [
  {
    key: "name",
    dataIndex: "name",
    title: "Name",
  },
  {
    key: "email",
    dataIndex: "email",
    title: "Email",
  },
];

const dataSource2 = [
  {
    key: 0,
    name: "Example 1",
    email: "Something",
  },
  {
    key: 1,
    name: "Example 2",
    email: "Something",
  },
];

const PositionList = () => {
  const [showListEmployees, setShowListEmployees] = useState(false);

  const handleToggleShowListEmployees = () => {
    setShowListEmployees(!showListEmployees);
  };

  return (
    <div className="delivery-list">
      {showListEmployees ? (
        <AppTable
          columns={columns2}
          dataSource={dataSource2}
          tableName="List Employees"
          onGoBack={handleToggleShowListEmployees}
        />
      ) : (
        <AppTable
          columns={columns(handleToggleShowListEmployees)}
          dataSource={dataSource}
          tableName="List Positions"
        />
      )}
    </div>
  );
};

export default PositionList;
