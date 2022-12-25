import { useContext } from "react";
import { Space, Typography } from "antd";

import AppTag from "@/components/AppTag";
import { CreateTestContext } from "@/pages/tests/create-test";
import ShowQuestion from "./ShowQuestion";

const { Text } = Typography;

const ShowTest = () => {
  const { randomTest = [] } = useContext(CreateTestContext) as any;
  return (
    <div className="show-test">
      {randomTest.length === 0 && (
        <Text>The random test will be displayed here</Text>
      )}
      {randomTest.map(({ answer, ...restOfQuestion }: any, index: number) => (
        <ShowQuestion
          key={restOfQuestion.id}
          idx={index + 1}
          question={restOfQuestion}
          answer={answer}
          disableInput
        />
      ))}
    </div>
  );
};

export default ShowTest;
