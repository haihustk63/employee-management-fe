import { FC, useMemo } from "react";

import AppTable from "@/components/AppTable";
import { testQuestionListColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";

const TestQuestionList: FC<ITableDataProps> = ({
  dataSource,
  loading,
  currentPage = 0,
  rowSelection,
}) => {

  const columns = useMemo(() => {
    return testQuestionListColumns({
      currentPage,
    });
  }, [currentPage]);

  return (
    <div className="test-question-list">
      <AppTable
        dataSource={dataSource}
        loading={loading}
        columns={columns}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default TestQuestionList;
