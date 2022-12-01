import AppTable from "@/components/AppTable";
import { testQuestionListColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { useGetConstantTestQuestion } from "@/hooks/constant";
import React, { FC, useMemo } from "react";

const TestQuestionList: FC<ITableDataProps> = ({
  dataSource,
  loading,
  currentPage = 0,
}) => {
  const [testQuestionTypesContants, testQuestionLevelsContants] =
    useGetConstantTestQuestion() as any;

  const handleClickViewDetail = () => {};

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
      <AppTable dataSource={dataSource} loading={loading} columns={columns} />
    </div>
  );
};

export default TestQuestionList;
