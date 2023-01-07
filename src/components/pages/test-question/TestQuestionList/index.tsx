import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import AppTable from "@/components/AppTable";
import { testQuestionListColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";

const TestQuestionList: FC<ITableDataProps> = ({
  dataSource,
  loading,
  currentPage = 0,
  rowSelection,
}) => {
  const navigate = useNavigate();

  const handleClickViewDetail = (testId: number) => () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.TEST_QUESTION_UPDATE(testId));
  };

  const columns = useMemo(() => {
    return testQuestionListColumns({
      onClickButtonViewDetail: handleClickViewDetail,
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
