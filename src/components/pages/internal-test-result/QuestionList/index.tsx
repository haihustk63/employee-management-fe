import AppCodeBlock from "@/components/AppCodeBlock";
import { COMMON_TYPE_QUESTION } from "@/constants/common";
import { Typography } from "antd";
import cx from "classnames";
import { FC, useMemo } from "react";

const { Text } = Typography;
const { essays } = COMMON_TYPE_QUESTION;

const TestResultQuestionItem: FC<{
  questionId?: any;
  question?: any;
  questionIdx?: number;
  contestantAnswer?: any;
}> = ({ questionId, question, questionIdx, contestantAnswer }: any) => {
  const checkRightAnswer = (answerId: string) => {
    const right = question?.answer?.find((item: string) => item === answerId);
    const contestantChose = contestantAnswer?.includes(answerId);
    if (right && contestantChose) {
      return true;
    }
    if (!right && contestantChose) {
      return false;
    }
    if (right && !contestantChose) {
      return null;
    }
    return undefined;
  };

  return (
    <div className="test-result-question-item">
      <Text className="index">Question {questionIdx + 1}</Text>
      <Text className="content">{question?.questionText}</Text>
      <div className="codeblocks">
        {question?.questionSource?.map(({ id, source }: any) => (
          <AppCodeBlock type={source.type} content={source.content} key={id} />
        ))}
      </div>
      {question?.type !== essays.value ? (
        <>
          <div className="answers">
            {question?.options?.map((item: any, idx: number) => {
              const right = checkRightAnswer(item.id);
              return (
                <div key={item.id} className="item">
                  <span className="index">{idx + 1}</span>
                  <Text
                    className={cx({
                      text: true,
                      right: right,
                      wrong: right === false,
                      miss: right === null,
                    })}
                  >
                    {item.choice}
                  </Text>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="essay">{contestantAnswer?.content || "No answer"}</div>
      )}
    </div>
  );
};

export default TestResultQuestionItem;
