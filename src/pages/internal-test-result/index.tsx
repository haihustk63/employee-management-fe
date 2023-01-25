import AppTag from "@/components/AppTag";
import TestResultQuestionItem from "@/components/pages/internal-test-result/QuestionList";
import { useGetContestantTest } from "@/hooks/tests";
import { getSkillTestStatusLabel, mergeName } from "@/utils";
import { Typography } from "antd";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const { Text } = Typography;

const InternalTestResult = () => {
  const { testId = "" } = useParams();
  const { data: testInfo } = useGetContestantTest(testId) as any;

  const contestantName = useMemo(() => {
    if (testInfo?.account?.employee) {
      return mergeName(testInfo.employee);
    }
    return testInfo?.account?.candidate?.name;
  }, [testInfo]);

  const getContestantAnswer = (questionId: number) => {
    return testInfo?.skillTestSessionAnswer?.find(
      (item: any) => item.questionId === questionId
    )?.answer;
  };

  return (
    <div className="internal-test-result">
      <div className="summary">
        {!!contestantName && <p className="name">{contestantName}</p>}
        <p className="email">{testInfo?.email}</p>
        <p className="title">{testInfo?.test?.title}</p>
        <div className="tags">
          <AppTag color="success">{testInfo?.test?.duration} Minutes</AppTag>
          <AppTag color="success">
            {getSkillTestStatusLabel(testInfo?.status)}
          </AppTag>
        </div>
      </div>

      <div className="instruction">
        <Text className="item">
          This is a right answer and the contestant chose it
        </Text>
        <Text className="item">
          This is a wrong answer and the contestant chose it
        </Text>
        <Text className="item">
          This is a right answer but the contestant did not chose it
        </Text>
      </div>

      <div className="detail">
        {testInfo?.test?.testQuestionSkillTest?.map(
          ({ questionId, question }: any, index: number) => (
            <TestResultQuestionItem
              key={questionId}
              question={question}
              questionId={questionId}
              questionIdx={index}
              contestantAnswer={getContestantAnswer(questionId)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default InternalTestResult;
