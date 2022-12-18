import AppButton from "@/components/AppButton";
import { useGetTest } from "@/hooks/tests";
import { currentUserAtom } from "@/modules/currentUser";
import { CandidateSkillTestContext } from "@/pages/skill-test";
import { useContext } from "react";
import { useRecoilValue } from "recoil";

const Sumary = () => {
  const { candidate } = useRecoilValue(currentUserAtom);
  const {
    data = [],
    isLoading,
    isFetching,
  } = useGetTest(candidate?.skillTest?.id);

  const { answers, handleEnableTour, handleStart } = useContext(
    CandidateSkillTestContext
  ) as any;

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
        {data.map((_item: any, index: number) => {
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
