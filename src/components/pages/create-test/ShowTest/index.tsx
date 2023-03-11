import { Alert, Typography } from "antd";
import { FC } from "react";

import AppModal from "@/components/AppModal";
import ShowQuestion from "./ShowQuestion";

const { Text } = Typography;

const ShowTestModal: FC<{
  testTitle?: string;
  test?: any[];
  isOpenModal?: boolean;
  toggleModal?: any;
}> = ({ isOpenModal, test, toggleModal, testTitle }) => {
  return (
    <AppModal
      open={isOpenModal}
      onCancel={toggleModal}
      wrapClassName="show-test"
    >
      {testTitle && <Text className="title">{testTitle}</Text>}
      {!test?.length && (
        <Alert description="This test has no question" message="No question" />
      )}
      {test?.map(({ answer, ...restOfQuestion }: any, index: number) => (
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
