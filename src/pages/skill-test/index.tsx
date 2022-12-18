import { Step } from "intro.js-react";
import { createContext, useState } from "react";

import AppTour from "@/components/AppTour";
import SessionInfo from "@/components/pages/skill-test/SessionInfo";
import Sumary from "@/components/pages/skill-test/Sumary";
import SkillTestContent from "@/components/pages/skill-test/Tests";

export const CandidateSkillTestContext = createContext({});

const CandidateSkillTest = () => {
  const [enabledTour, setEnabledTour] = useState(false);
  const [answers, setAnswers] = useState<(string | string[])[]>([]);
  const [start, setStart] = useState(false);

  const tourSteps: Step[] = [
    {
      title: "Sumary",
      intro:
        "You can see your progress here and you can click on each item to see the corrensponding question.",
      element: ".skill-test-sumary",
    },
    {
      title: "Time",
      intro: "Your time left is shown here.",
      element: ".skill-test-session-info #count-down",
    },
    {
      title: "Previous button",
      intro: "Click this button to go back to the previous question.",
      element: ".skill-test-btn-group #previous-btn",
    },
    {
      title: "Next question",
      intro: "Click this button to move to the next question.",
      element: ".skill-test-btn-group #next-btn",
    },
    {
      title: "Submit",
      intro: "Click this button to submit the test.",
      element: ".skill-test-btn-group #submit-btn",
    },
    {
      title: "Start to attempt",
      intro:
        "Click this button to start the test. You can only attempt one time.",
      element: "#attempt-btn",
    },
  ];

  const handleEnableTour = () => {
    setEnabledTour(true);
  };

  const handleStart = () => {
    setStart(true);
  };

  return (
    <CandidateSkillTestContext.Provider
      value={{ answers, start, setAnswers, handleEnableTour, handleStart }}
    >
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
          steps={tourSteps}
          enabled={enabledTour}
          onExit={() => setEnabledTour(false)}
        />
      </div>
    </CandidateSkillTestContext.Provider>
  );
};

export default CandidateSkillTest;
