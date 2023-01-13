import { Typography } from "antd";
import { useContext } from "react";

import { CandidateSkillTestContext } from "@/pages/skill-test/do-test";
import ShowQuestion from "../../create-test/ShowTest/ShowQuestion";
import ButtonGroup from "./ButtonGroup";

const { Text } = Typography;

const SkillTestContent = () => {
  const {
    answers = [],
    setAnswers,
    test = [],
    testId,
    handleSubmit,
  } = useContext(CandidateSkillTestContext) as any;

  const handleChangeAnswer = (questionId: number) => (e: any) => {
    const questionIdx = answers.findIndex(
      (answer: any) => answer.questionId === questionId
    );
    let newData;

    if ((typeof e === "object" && Array.isArray(e)) || typeof e === "string") {
      newData = { questionId, answer: e };
    } else {
      newData = { questionId, answer: e.target.value };
    }

    setAnswers?.([
      ...answers.slice(0, questionIdx),
      newData,
      ...answers.slice(questionIdx + 1, answers.length),
    ]);
  };

  return (
    <div className="skill-test-content">
      {test?.map((question: any, index: number) => (
        <ShowQuestion
          key={question.questionId}
          idx={index + 1}
          question={question.question}
          handleChange={handleChangeAnswer(question.questionId)}
          value={answers?.[index]?.answer}
        />
      ))}
      <ButtonGroup onSubmit={handleSubmit} />
    </div>
  );
};

export default SkillTestContent;
