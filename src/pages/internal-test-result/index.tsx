import AppTag from "@/components/AppTag";
import AppTooltip from "@/components/AppTooltip";
import PrintIcon from "@/components/Icons/PrintIcon";
import TestResultQuestionItem from "@/components/pages/internal-test-result/QuestionList";
import { useGetContestantTest } from "@/hooks/tests";
import { getSkillTestStatusLabel, mergeName } from "@/utils";
import { Typography } from "antd";
import { useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";

const { Text } = Typography;

const InternalTestResult = () => {
  const testResultRef = useRef(null);
  const { testId = "" } = useParams();
  const { data: testInfo } = useGetContestantTest(testId) as any;

  const contestantName = useMemo(() => {
    if (testInfo?.account?.employee) {
      return mergeName(testInfo.employee);
    }
    return testInfo?.account?.candidate?.name;
  }, [testInfo]);

  const ButtonPrint = () => (
    <div className="print">
      <AppTooltip title="Print this result">
        <span className="icon">
          <PrintIcon />
        </span>
      </AppTooltip>
    </div>
  );

  const getContestantAnswer = (questionId: number) => {
    return testInfo?.skillTestSessionAnswer?.find(
      (item: any) => item.questionId === questionId
    )?.answer;
  };

  return (
    <div className="internal-test-result" ref={testResultRef}>
      <div className="summary">
        <div className="contestant">
          {!!contestantName && <Text className="name">{contestantName}</Text>}
          <Text className="email">{testInfo?.email}</Text>
        </div>
        <Text className="title">{testInfo?.test?.title}</Text>
        <div className="tags">
          <AppTag color="success">{testInfo?.test?.duration} Minutes</AppTag>
          <AppTag color="success">
            {getSkillTestStatusLabel(testInfo?.status)}
          </AppTag>
        </div>
        <Text className="note">
          You should print this result (This result can be changed in the future
          because this test or the questions can be updated afterwards)!
        </Text>
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
      <ReactToPrint
        trigger={ButtonPrint}
        content={() => testResultRef.current}
      />
    </div>
  );
};

export default InternalTestResult;
