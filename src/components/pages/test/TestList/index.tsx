import AppButton from "@/components/AppButton";
import AppPrimaryCard from "@/components/AppCard/Primary";
import AppTable from "@/components/AppTable";
import AppTag from "@/components/AppTag";
import { TestsContext } from "@/pages/tests";
import { Typography } from "antd";
import React, { useContext } from "react";
import TestListAction from "../TestListAction";

const { Text } = Typography;

const TestList = () => {
  const { tests } = useContext(TestsContext) as any;

  return (
    <div className="test-list">
      <Text className="app-title">Tests</Text>
      <div className="list">
        {tests?.map((item: any) => {
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
    </div>
  );
};

export default TestList;
