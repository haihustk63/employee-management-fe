import { Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { useSubmitAnswer } from "@/hooks/tests";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { currentUserAtom } from "@/modules/currentUser";
import { CandidateSkillTestContext } from "@/pages/skill-test";
import ShowQuestion from "../../create-test/ShowTest/ShowQuestion";
import ButtonGroup from "./ButtonGroup";

const { Text } = Typography;

const SkillTestContent = () => {
  const { candidate } = useRecoilValue(currentUserAtom);

  const {
    mutate: onSubmitAnswer,
    isError,
    isSuccess,
  } = useSubmitAnswer(candidate?.skillTest?.id);

  const {
    answers = [],
    setAnswers,
    test = [],
  } = useContext(CandidateSkillTestContext) as any;

  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [answers]);

  useEffect(() => {
    if (test.length) {
      const newAnswers: (string | string[])[] = [];
      test.map((q: any) => {
        const { question } = q;
        if (question.type === "ONE_CHOICE" || question.type === "ESSAYS") {
          newAnswers.push("");
        } else if (question.type === "MULTIPLE_CHOICE") {
          newAnswers.push([]);
        }
      });

      setAnswers?.(newAnswers);
    }
  }, [test]);

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "The test is submited successfully",
  });

  const handleChangeAnswer = (index: number) => (e: any) => {
    const newAnswer = [...answers];
    if (typeof e === "object") {
      if (Array.isArray(e)) {
        newAnswer[index] = e;
      } else {
        newAnswer[index] = e.target.value;
      }
    } else {
      newAnswer[index] = e;
    }
    setAnswers?.(newAnswer);
  };

  const handleSubmit = () => {
    const notCompleted = answers.some((item: any, index: number) => {
      if (Array.isArray(item)) {
        return !item.length;
      } else {
        return !item;
      }
    });
    if (notCompleted) {
      setError(true);
      return;
    }
    const sendAnswer = answers?.map((answer: any, index: number) => ({
      questionId: test?.[index]?.questionId,
      answer: typeof answer === "string" ? [answer] : answer,
    }));

    onSubmitAnswer(sendAnswer);
  };

  return (
    <div className="skill-test-content">
      {test?.map((question: any, index: number) => (
        <ShowQuestion
          key={question.questionId}
          idx={index + 1}
          question={question.question}
          handleChange={handleChangeAnswer(index)}
          value={answers?.[index]}
        />
      ))}
      <ButtonGroup onSubmit={handleSubmit} />
      {error && <Text>There are still some questions left</Text>}
    </div>
  );
};

export default SkillTestContent;
