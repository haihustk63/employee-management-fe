import { FC, useMemo } from "react";

import AppTable from "@/components/AppTable";
import { createTestColumns } from "@/constants/columns";
import { useClassifiedQuestion } from "@/hooks/test-question";
import { useGetAllTestTopics } from "@/hooks/test-topic";

const InputQuestionInfo: FC = () => {
  const { data: classifiedData } = useClassifiedQuestion();
  const { data = [], isLoading, isFetching } = useGetAllTestTopics();
  const columns = useMemo(
    () => createTestColumns({ classifiedData }),
    [classifiedData]
  );

  return (
    <div className="input-question-info">
      <AppTable
        dataSource={data}
        loading={isLoading || isFetching}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default InputQuestionInfo;
