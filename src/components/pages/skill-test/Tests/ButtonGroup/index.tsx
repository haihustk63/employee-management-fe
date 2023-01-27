import AppButton from "@/components/AppButton";
import { CandidateSkillTestContext } from "@/pages/skill-test/do-test";
import { useContext } from "react";

const ButtonGroup = ({ onSubmit }: any) => {
  const { isAllEmpty } = useContext(CandidateSkillTestContext) as any;
  
  return (
    <div className="skill-test-btn-group">
      {/* <AppButton buttonTitle="Previous" id="previous-btn" /> */}
      {/* when end of tests, the below button's title is Submit */}
      {/* <AppButton buttonTitle="Next" id="next-btn" /> */}
      <AppButton
        buttonTitle="Submit"
        id="submit-btn"
        onClick={onSubmit}
        disabled={isAllEmpty}
      />
    </div>
  );
};

export default ButtonGroup;
