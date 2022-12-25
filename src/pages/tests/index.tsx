import AppTable from "@/components/AppTable";
import { testsTableColumns } from "@/constants/columns";
import { useGetAllTests } from "@/hooks/tests";
import React, { useMemo, useState } from "react";

export const TestsManagement = () => {
  const { data: tests = [], isLoading, isFetching } = useGetAllTests();
  const [currentPage, setCurrentPage] = useState(0);

  const columns = useMemo(() => {
    return testsTableColumns(currentPage);
  }, [currentPage]);

  return (
    <div className="test-management">
      <AppTable
        dataSource={tests}
        loading={isLoading || isFetching}
        columns={columns}
      />
    </div>
  );
};

export default TestsManagement;
