import { createContext, useEffect, useMemo, useState } from "react";

import ConfirmAttempt from "@/components/pages/skill-test/ConfirmAttempt";
import SessionInfo from "@/components/pages/skill-test/SessionInfo";
import Sumary from "@/components/pages/skill-test/Sumary";
import SkillTestContent from "@/components/pages/skill-test/Tests";
import { COMMON_TYPE_QUESTION, TEST_STATUS } from "@/constants/common";
import {
  APP_PAGE_NAME_ROUTES,
  DYNAMIC_APP_PAGE_ROUTES,
} from "@/constants/routes";
import {
  useGetContestantTest,
  useSubmitAnswer,
  useUpdateContestantTest,
} from "@/hooks/tests";
import { useNavigate, useParams } from "react-router-dom";
import appNotification from "@/components/AppNotification";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

const { attempting, created, done } = TEST_STATUS;
const { essays, multipleChoice, oneChoice } = COMMON_TYPE_QUESTION;

export const CandidateSkillTestContext = createContext({});

const DoSkillTest = () => {
  const navigate = useNavigate();
  const { testId = "" } = useParams();

  const [answers, setAnswers] = useState<any[]>([]);
  const [duration, setDuration] = useState(0);

  const { mutate: onUpdate } = useUpdateContestantTest(testId);
  const { data: info, isError } = useGetContestantTest(testId) as any;
  const {
    mutate: onSubmitAnswer,
    isError: submitError,
    isSuccess: submitSuccess,
  } = useSubmitAnswer(testId);

  useTriggerNoti({
    isError: submitError,
    isSuccess: submitSuccess,
    messageSuccess: "The test is submited successfully",
  });

  const test = useMemo(() => {
    if (info) {
      return info?.test?.testQuestionSkillTest;
    }
  }, [info]);

  useEffect(() => {
    if (isError) {
      navigate(APP_PAGE_NAME_ROUTES.SKILL_TEST);
    }
  }, [isError]);

  useEffect(() => {
    if (info?.status === done.value) {
      return navigate(DYNAMIC_APP_PAGE_ROUTES.SKILL_TEST_RESULT(testId));
    }
  }, [info]);

  useEffect(() => {
    if (test) {
      let initAnswers: any[] = [];
      test.map(({ question, questionId }: any) => {
        const type = question.type;
        if (type === multipleChoice.value) {
          initAnswers.push({ questionId, answer: [] });
        } else {
          initAnswers.push({ questionId, answer: "" });
        }
      });
      setAnswers(initAnswers);
    }
  }, [test]);

  useEffect(() => {
    if (info?.test?.duration) {
      const durationInSecond = info?.test?.duration * 60;
      const currentDuration = JSON.parse(
        localStorage.getItem("candidate-test-duration") || "[]"
      );
      const currentTest = currentDuration?.find(
        (item: any) => item.testId === testId
      );
      if (!currentTest) {
        localStorage.setItem(
          "candidate-test-duration",
          JSON.stringify([
            ...currentDuration,
            { testId, duration: durationInSecond },
          ])
        );
        setDuration(durationInSecond);
      } else {
        setDuration(currentTest.duration);
      }
    }
  }, [info?.test?.duration]);

  const isAllEmpty = useMemo(() => {
    return answers?.every((item: any) => !item?.answer?.length);
  }, [answers]);

  const confirmAttempt = () => {
    onUpdate({ confirmAttempt: true });
  };

  const handleSetCurrentDuration = (seconds: number) => {
    const currentDuration = JSON.parse(
      localStorage.getItem("candidate-test-duration") || "[]"
    );
    const currentTestIndex = currentDuration?.findIndex(
      (item: any) => item.testId === testId
    );

    if (currentTestIndex >= 0) {
      localStorage.setItem(
        "candidate-test-duration",
        JSON.stringify([
          ...currentDuration.slice(0, currentTestIndex),
          { testId, duration: seconds },
          ...currentDuration.slice(
            currentTestIndex + 1,
            currentDuration.length
          ),
        ])
      );
    }

    if (!seconds) {
      if (isAllEmpty) {
        navigate(APP_PAGE_NAME_ROUTES.SKILL_TEST);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    const sessionId = Number(testId);

    const sendAnswers = answers
      .map(({ questionId, answer }: any, index: number) => ({
        sessionId,
        questionId: questionId,
        answer: transformAnswer(answer, index),
      }))
      .filter(
        (item: any) =>
          item.answer?.length > 0 || item.answer?.content?.length > 0
      );

    onSubmitAnswer({ testId: sessionId, answers: sendAnswers });
  };

  const transformAnswer = (answer: any, index: number) => {
    const questionType = test[index]?.question?.type;
    if (questionType === oneChoice.value) {
      return [answer];
    } else if (questionType === essays.value) {
      return { content: answer };
    } else {
      return answer;
    }
  };

  return (
    <CandidateSkillTestContext.Provider
      value={{
        answers,
        test,
        duration,
        testId: Number(testId),
        isAllEmpty,
        setAnswers,
        confirmAttempt,
        handleSetCurrentDuration,
        handleSubmit,
      }}
    >
      {info?.status === created.value && <ConfirmAttempt />}
      {info?.status === attempting.value && test && (
        <div className="candidate-skill-do-test">
          <Sumary />
          <div className="content">
            <SessionInfo />
            <SkillTestContent />
          </div>
          {/* <AppTour
            initialStep={0}
            steps={SKILL_TEST_INTRO_STEPS}
            enabled={true}
            onExit={onEndTour}
          /> */}
        </div>
      )}
    </CandidateSkillTestContext.Provider>
  );
};

export default DoSkillTest;
