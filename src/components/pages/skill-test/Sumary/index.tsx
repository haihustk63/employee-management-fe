import AppButton from "@/components/AppButton";
import { CandidateSkillTestContext } from "@/pages/skill-test/do-test";
import { useContext } from "react";

const Sumary = () => {
  const { answers, test = [] } = useContext(CandidateSkillTestContext) as any;

  const setBackgroundColor = (index: number) => {
    const answer = answers[index]?.answer;
    if (answer?.length === 0 || answer === undefined) {
      return "blue";
    } else {
      return "green";
    }
  };

  return (
    <div className="skill-test-sumary">
      <div className="sumary">
        {test?.map((_item: any, index: number) => {
          return (
            <div
              key={index + 1}
              className="number"
              style={{
                backgroundColor: `var(--color-primary-${setBackgroundColor(
                  index
                )})`,
              }}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sumary;
