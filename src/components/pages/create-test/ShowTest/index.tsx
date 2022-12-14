import { useContext } from "react";
import { Space, Typography } from "antd";

import AppTag from "@/components/AppTag";
import { CreateTestContext } from "@/pages/create-test";
import ShowQuestion from "./ShowQuestion";

const { Text } = Typography;

const ShowTest = () => {
  const { randomTest = [] } = useContext(CreateTestContext) as any;
  return (
    <div className="show-test">
      {randomTest.length === 0 && (
        <Text>The random test will be displayed here</Text>
      )}
      {randomTest.map((question: any) => (
        <ShowQuestion key={question.id} question={question} />
      ))}
    </div>
  );
};

export default ShowTest;
