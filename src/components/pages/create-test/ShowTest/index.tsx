import { Typography } from "antd";
import { useContext } from "react";

import { CreateTestContext } from "@/pages/tests/create-test";
import ShowQuestion from "./ShowQuestion";
import AppModal from "@/components/AppModal";

const { Text } = Typography;

const ShowTestModal = () => {
  const {
    randomTest = [],
    showTestModal,
    toggleShowTestModal,
  } = useContext(CreateTestContext) as any;
  return (
    <AppModal
      open={showTestModal}
      onCancel={toggleShowTestModal}
      wrapClassName="show-test"
    >
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
    </AppModal>
  );
};

export default ShowTestModal;
