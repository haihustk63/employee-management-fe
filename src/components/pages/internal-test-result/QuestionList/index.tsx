import { FC, useMemo } from "react";
import cx from "classnames";
import AppCodeBlock from "@/components/AppCodeBlock";
import { COMMON_TYPE_QUESTION } from "@/constants/common";
import { AppInputTextArea } from "@/components/AppFormField";

const { essays } = COMMON_TYPE_QUESTION;

const TestResultQuestionItem: FC<{
  questionId?: any;
  question?: any;
  questionIdx?: number;
  contestantAnswer?: any;
}> = ({ questionId, question, questionIdx, contestantAnswer }: any) => {
  const rightAnswers = useMemo(() => {
    return question?.answer?.map((item: string) => {
      return question?.options?.find((option: any) => option.id === item)
        ?.choice;
    });
  }, [question?.answer]);

  const checkRightAnswer = (answerId: string) => {
    const right = question?.answer?.find((item: string) => item === answerId);
    const contestantChose = contestantAnswer?.includes(answerId);
    if (right && contestantChose) {
      return true;
    }
    if (!right && contestantChose) {
      return false;
    }
    return undefined;
  };

  return (
    <div className="test-result-question-item">
      <p className="index">Question {questionIdx + 1}</p>
      <p className="content">{question.questionText}</p>
      <div className="codeblocks">
        {question?.questionSource?.map(({ id, source }: any) => (
          <AppCodeBlock type={source.type} content={source.content} key={id} />
        ))}
      </div>
      {question.type !== essays.value ? (
        <>
          <div className="answers">
            {question?.options?.map((item: any, idx: number) => {
              const right = checkRightAnswer(item.id);
              return (
                <p
                  key={item.id}
                  className={cx({
                    item: true,
                    "-right": right,
                    "-wrong": !right,
                  })}
                >
                  {idx + 1}. <span>{item.choice}</span>
                </p>
              );
            })}
          </div>
          <div className="right">
            <p className="text">Right answers</p>
            {rightAnswers?.map((item: string, idx: number) => (
              <p key={idx}>{item}</p>
            ))}
          </div>
        </>
      ) : (
        <AppInputTextArea value={contestantAnswer?.content} disabled />
      )}
    </div>
  );
};

export default TestResultQuestionItem;
