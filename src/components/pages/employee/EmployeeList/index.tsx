import AppButton from "@/components/AppButton";
import AppTable from "@/components/AppTable";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useNavigate } from "react-router-dom";

const columns = (onClickButtonViewDetail: any) => [
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
  {
    key: "action",
    dataIndex: "action",
    title: "Action",
    width: "20%",
    render: (_: any, record: any) => {
      return (
        <AppButton
          buttonTitle="View Employees"
          htmlType="button"
          onClick={onClickButtonViewDetail(record.id)}
        />
      );
    },
  },
];

const dataSource = [
  {
    key: 0,
    id: "123",
    name: "Example 1",
    email: "Something",
  },
  {
    key: 1,
    id: "456",
    name: "Example 2",
    email: "Something",
  },
];

const EmployeeList = () => {
  const navigate = useNavigate();

  const handleClickButtonViewDetail = (id: any) => () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.EMPLOYEE_UPDATE(id));
  };

  return (
    <div className="employee-list">
      <AppTable
        columns={columns(handleClickButtonViewDetail)}
        dataSource={dataSource}
        tableName="List Employee"
      />
    </div>
  );
};

export default EmployeeList;
