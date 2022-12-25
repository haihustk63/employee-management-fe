import { FC, useContext, useMemo } from "react";

import AppTable from "@/components/AppTable";
import { createTestColumns } from "@/constants/columns";
import { useClassifiedQuestion } from "@/hooks/test-question";
import { useGetAllTestTopics } from "@/hooks/test-topic";
import { CreateTestContext } from "@/pages/tests/create-test";

const InputQuestionInfo: FC = () => {
  const { onSubmitQuestionInfo } = useContext(CreateTestContext) as any;
  const { data: classifiedData } = useClassifiedQuestion();
  const { data, isLoading, isFetching } = useGetAllTestTopics();
  const columns = useMemo(
    () => createTestColumns({ onSubmitQuestionInfo, classifiedData }),
    [classifiedData, onSubmitQuestionInfo]
  );

  return (
    <div className="input-question-info">
      <AppTable
        dataSource={data}
        loading={isLoading || isFetching}
        columns={columns}
      />
    </div>
  );
};

export default InputQuestionInfo;
