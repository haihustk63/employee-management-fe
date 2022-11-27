import { FC } from "react";
import { useNavigate } from "react-router-dom";

import AppTable from "@/components/AppTable";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { IEmployeeListProps } from "./interface";
import { employeeListColumns } from "@/constants/columns";

const EmployeeList: FC<IEmployeeListProps> = ({
  employeeList,
  loading,
  currentPage = 0,
}) => {
  const navigate = useNavigate();

  const handleClickButtonViewDetail = (id: any) => () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.EMPLOYEE_UPDATE(id));
  };

  return (
    <div className="employee-list">
      <AppTable
        columns={employeeListColumns(handleClickButtonViewDetail, currentPage)}
        dataSource={employeeList}
        tableName="List Employee"
        loading={loading}
      />
    </div>
  );
};

export default EmployeeList;
