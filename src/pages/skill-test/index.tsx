import { createContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import AppTour from "@/components/AppTour";
import SessionInfo from "@/components/pages/skill-test/SessionInfo";
import Sumary from "@/components/pages/skill-test/Sumary";
import SkillTestContent from "@/components/pages/skill-test/Tests";
import { SKILL_TEST_INTRO_STEPS } from "@/constants/common";
import { useNavigate } from "react-router-dom";
import { useGetTest, useGetTestStatus } from "@/hooks/tests";
import { currentUserAtom } from "@/modules/currentUser";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";

export const CandidateSkillTestContext = createContext({});

const CandidateSkillTest = () => {
  const navigate = useNavigate();
  const { candidate } = useRecoilValue(currentUserAtom);

  const [enabledTour, setEnabledTour] = useState(false);
  const [answers, setAnswers] = useState<(string | string[])[]>([]);
  const [start, setStart] = useState(false);

  const { data } = useGetTestStatus(candidate?.skillTest?.id) as any;
  const isSubmitted = data?.isSubmitted;

  const {
    data: test = [],
    isLoading,
    isFetching,
  } = useGetTest(candidate?.skillTest?.id, isSubmitted === false);

  useEffect(() => {
    if (isSubmitted) {
      navigate(APP_PAGE_NAME_ROUTES.APPLY_PROCESS);
    }
  }, [isSubmitted]);

  const handleEnableTour = () => {
    setEnabledTour(true);
  };

  const handleStart = () => {
    setStart(true);
  };

  return (
    <CandidateSkillTestContext.Provider
      value={{
        answers,
        start,
        test,
        setAnswers,
        handleEnableTour,
        handleStart,
      }}
    >
      {isSubmitted === false && (
        <div className="candidate-skill-test">
          <div>
            <Sumary />
          </div>
          <div className="content">
            <SessionInfo />
            <SkillTestContent />
          </div>
          <AppTour
            initialStep={0}
            steps={SKILL_TEST_INTRO_STEPS}
            enabled={enabledTour}
            onExit={() => setEnabledTour(false)}
          />
        </div>
      )}
    </CandidateSkillTestContext.Provider>
  );
};

export default CandidateSkillTest;
