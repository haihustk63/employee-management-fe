import { FC, useMemo } from "react";

import AppTable from "@/components/AppTable";
import { employeeListColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";

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
        loading={loading}
        scroll={{ x: 1600 }}
      />
    </div>
  );
};

export default EmployeeList;
