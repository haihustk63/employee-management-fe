import { CandidateSkillTestContext } from "@/pages/skill-test/do-test";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Sumary = () => {
  const navigate = useNavigate();
  const { answers, test = [] } = useContext(CandidateSkillTestContext) as any;

  const setBackgroundColor = (index: number) => {
    const answer = answers[index]?.answer;
    if (answer?.length === 0 || answer === undefined) {
      return "blue";
    } else {
      return "green";
    }
  };

  const scrollToQuestion = (id: string) => () => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="skill-test-sumary">
      <div className="sumary">
        {test?.map((_item: any, index: number) => {
          return (
            <a
              onClick={scrollToQuestion(`#skill-test-question-${index + 1}`)}
              key={index + 1}
              className="number"
              style={{
                backgroundColor: `var(--color-primary-${setBackgroundColor(
                  index
                )})`,
              }}
            >
              {index + 1}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Sumary;
