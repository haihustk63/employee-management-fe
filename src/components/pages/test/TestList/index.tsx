import AppPrimaryCard from "@/components/AppCard/Primary";
import AppPagination from "@/components/AppPagination";
import AppSearchKeyword from "@/components/AppSearchKeyword";
import AppTag from "@/components/AppTag";
import { TestsContext } from "@/pages/tests";
import { Typography } from "antd";
import { useContext, useMemo } from "react";
import TestListAction from "../TestListAction";

const { Text } = Typography;

const TestList = () => {
  const {
    tests,
    isInit,
    queryParams,
    searchParams,
    setQueryParams,
    resetPageParams,
    setIsInit,
  } = useContext(TestsContext) as any;

  const totalTests = useMemo(() => tests?.total, [tests]);

  const changePage = (page: number) => {
    setQueryParams({ page });
  };

  return (
    <div className="test-list">
      <Text className="app-title">Skill Test Management</Text>
      <AppSearchKeyword
        isInit={isInit}
        queryParams={queryParams}
        searchParams={searchParams}
        placeholder="Search by skill test title"
        resetPageParams={resetPageParams}
        setIsInit={setIsInit}
        setQueryParams={setQueryParams}
      />
      <div className="list">
        {tests.data?.map((item: any) => {
          return (
            <AppPrimaryCard
              className="test-card"
              title={item.title}
              key={item.id}
            >
              <div className="description">
                <AppTag color="success">{item.duration} minutes</AppTag>
              </div>
              <TestListAction testId={item.id} />
            </AppPrimaryCard>
          );
        })}
      </div>
      <AppPagination
        total={totalTests}
        onChangePagination={changePage}
        current={queryParams?.page}
      />
    </div>
  );
};

export default TestList;
