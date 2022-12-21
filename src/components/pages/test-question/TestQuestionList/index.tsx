import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import AppTable from "@/components/AppTable";
import { testQuestionListColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useGetConstantTestQuestion } from "@/hooks/constant";

const TestQuestionList: FC<ITableDataProps> = ({
  dataSource,
  loading,
  currentPage = 0,
  rowSelection,
}) => {
  const navigate = useNavigate();

  const [testQuestionTypesContants, testQuestionLevelsContants] =
    useGetConstantTestQuestion() as any;

  const handleClickViewDetail = (recordId: number) => () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.TEST_QUESTION_UPDATE(recordId));
  };

  const columns = useMemo(() => {
    return testQuestionListColumns({
      onClickButtonViewDetail: handleClickViewDetail,
      testQuestionLevelsContants: testQuestionLevelsContants.data?.levels,
      testQuestionTypesContants: testQuestionTypesContants.data?.types,
      currentPage,
    });
  }, [testQuestionLevelsContants.data, testQuestionTypesContants.data]);

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
