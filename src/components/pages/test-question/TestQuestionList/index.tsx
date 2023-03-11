import { FC, useMemo } from "react";

import AppTable from "@/components/AppTable";
import { testQuestionListColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";

const TestQuestionList: FC<ITableDataProps> = ({
  dataSource,
  loading,
  rowSelection,
  allowDelete = true,
  needResetPage,
  onChangeTableParams,
}) => {
  const columns = useMemo(() => {
    return testQuestionListColumns({
      currentPage: dataSource?.page,
      allowDelete,
    });
  }, [dataSource]);

  return (
    <div className="test-question-list">
      <AppTable
        dataSource={dataSource?.data}
        loading={loading}
        total={dataSource?.total}
        columns={columns}
        rowSelection={rowSelection}
        onChangeParams={onChangeTableParams}
        needResetPage={needResetPage}
      />
    </div>
  );
};

export default TestQuestionList;
