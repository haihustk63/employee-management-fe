import AppButton from "@/components/AppButton";
import AppPrimaryCard from "@/components/AppCard/Primary";
import AppTable from "@/components/AppTable";
import AppTag from "@/components/AppTag";
import { TestsContext } from "@/pages/tests";
import React, { useContext } from "react";
import TestListAction from "../TestListAction";

const TestList = () => {
  const { tests } = useContext(TestsContext) as any;

  return (
    <div className="test-list">
      {tests?.map((item: any) => {
        return (
          <AppPrimaryCard
            title={item.title}
            key={item.id}
          >
            <AppTag color="success">{item.duration} minutes</AppTag>
            <TestListAction testId={item.id} />
          </AppPrimaryCard>
        );
      })}
    </div>
  );
};

export default TestList;
