import { FC, useContext, useMemo } from "react";

import AppTable from "@/components/AppTable";
import { testQuestionListColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { TestQuestionConText } from "@/pages/test-questions";

const TestQuestionList: FC<ITableDataProps> = ({
  dataSource,
  loading,
  rowSelection,
  allowDelete = true,
}) => {
  const { needResetPage, onChangeTableParams } = useContext(
    TestQuestionConText
  ) as any;

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
