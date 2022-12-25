import AppButton from "@/components/AppButton";
import { CandidateSkillTestContext } from "@/pages/skill-test";
import { useContext } from "react";

const Sumary = () => {
  const {
    answers,
    handleEnableTour,
    handleStart,
    test = [],
  } = useContext(CandidateSkillTestContext) as any;

  const setBackgroundColor = (index: number) => {
    if (
      (Array.isArray(answers[index]) && answers[index].length === 0) ||
      !answers[index]
    ) {
      return undefined;
    } else {
      return "red";
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
              style={{ backgroundColor: setBackgroundColor(index) }}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
      <div className="btns">
        <AppButton buttonTitle="Take a tour" onClick={handleEnableTour} />
        <AppButton
          id="attempt-btn"
          buttonTitle="Start to attempt"
          onClick={handleStart}
        />
      </div>
    </div>
  );
};

export default Sumary;
