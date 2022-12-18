import { useRecoilValue } from "recoil";
import { useContext, useEffect, useState } from "react";
import { Typography } from "antd";

import { useGetTest } from "@/hooks/tests";
import { currentUserAtom } from "@/modules/currentUser";
import ShowQuestion from "../../create-test/ShowTest/ShowQuestion";
import ButtonGroup from "./ButtonGroup";
import { CandidateSkillTestContext } from "@/pages/skill-test";

const { Text } = Typography;

const SkillTestContent = () => {
  const { candidate } = useRecoilValue(currentUserAtom);
  const {
    data = [],
    isLoading,
    isFetching,
  } = useGetTest(candidate?.skillTest?.id);

  const { answers, setAnswers } = useContext(CandidateSkillTestContext) as any;

  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [answers]);

  useEffect(() => {
    if (data.length) {
      const newAnswers: (string | string[])[] = [];
      data.map((q: any) => {
        const { question } = q;
        if (question.type === "ONE_CHOICE" || question.type === "ESSAYS") {
          newAnswers.push("");
        } else if (question.type === "MULTIPLE_CHOICE") {
          newAnswers.push([]);
        }
      });

      setAnswers?.(newAnswers);
    }
  }, [data]);

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
      console.log("fdjsjnf");
      setError(true);
    }
  };

  return (
    <div className="skill-test-content">
      {data.map((question: any, index: number) => (
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
