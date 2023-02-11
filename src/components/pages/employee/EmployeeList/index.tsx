import { FC, useContext, useMemo } from "react";

import AppTable from "@/components/AppTable";
import { employeeListColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { EmployeeManagementContext } from "@/pages/employee";

const EmployeeList: FC<ITableDataProps> = ({ dataSource, loading }) => {
  const { needResetPage, onChangeTableParams } = useContext(
    EmployeeManagementContext
  ) as any;

  const columns = useMemo(() => {
    return employeeListColumns({ currentPage: dataSource?.page || 1 });
  }, [dataSource]);

  return (
    <div className="employee-list">
      <AppTable
        columns={columns}
        dataSource={dataSource?.data}
        total={dataSource?.total}
        loading={loading}
        scroll={{ x: 1600 }}
        onChangeParams={onChangeTableParams}
        needResetPage={needResetPage}
      />
    </div>
  );
};

export default EmployeeList;
