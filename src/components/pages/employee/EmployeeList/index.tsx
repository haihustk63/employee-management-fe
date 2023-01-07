import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import AppTable from "@/components/AppTable";
import { employeeListColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";

const EmployeeList: FC<ITableDataProps> = ({
  dataSource,
  loading,
  currentPage = 0,
}) => {
  const columns = useMemo(() => {
    return employeeListColumns({ currentPage });
  }, [currentPage]);

  return (
    <div className="employee-list">
      <AppTable
        columns={columns}
        dataSource={dataSource}
        tableName="List Employee"
        loading={loading}
      />
    </div>
  );
};

export default EmployeeList;
